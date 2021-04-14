import React, { ErrorInfo, useState } from "react";
import { StyleSheet, ActivityIndicator, SafeAreaView } from "react-native";
import { Form, Text, Button, View, ActionSheet, Icon } from "native-base";
import { useDispatch } from "react-redux";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";

import QuoteForm from "../components/QuoteForm/QuoteForm";
import firestore from "@react-native-firebase/firestore";
import { addQuoteToBook, deleteQuote } from "../store/actions/book";
import { Quote } from "../interfaces/book.interface";
import { quoteSchema } from "../constants/Schemas";
import { showWarnToast } from "../helpers/Toast";
import { uuid } from "../helpers/uuid";
import { StackParamList } from "../navigation/types";

const styles = StyleSheet.create({
	addButton: {
		flex: 1.5,
		margin: 5,
	},
	buttonsContainer: {
		flex: 1,
		justifyContent: "flex-end",
	},
	clearButtonsContainer: {
		flexDirection: "row",
		marginTop: 20,
	},
	categories: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
	},
	clearButton: {
		flex: 1,
		margin: 5,
	},
	content: {
		flex: 1,
		padding: 10,
	},
	deleteButton: {
		flex: 0.8,
		margin: 5,
	},
	form: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-between",
	},
	formItem: {
		marginBottom: 15,
	},
});
interface Props {
	route: RouteProp<StackParamList, "Add/Edit Quote">;
	navigation: StackNavigationHelpers;
}

const initialQuote: Quote = {
	quote: "",
	categories: [],
};

const AddQuoteScreen: React.FC<Props> = ({ route, navigation }) => {
	const { bookId, quoteId, isEdit } = route.params;
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const initialEditQuote = {
		id: quoteId,
		quote: route.params.quote,
		categories: route.params.categories,
	};
	const bookRef = firestore().collection("books").doc(bookId);
	const [form, setForm] = useState(isEdit ? initialEditQuote : initialQuote);

	const handleSubmit = async ({ quote, categories }: Quote) => {
		const newQuote: Quote = { categories, quote };

		isEdit ? (newQuote.id = quoteId) : (newQuote.id = uuid());

		try {
			await quoteSchema.validate(form, { abortEarly: false });
			isEdit
				? updateQuoteInFirestore(initialEditQuote, newQuote)
				: addQuoteToFirestore(newQuote);
		} catch (e) {
			showWarnToast(e);
		}
	};

	const addQuoteToFirestore = async (quote: Quote) => {
		setLoading(true);

		try {
			await bookRef.update({
				quotes: firestore.FieldValue.arrayUnion(quote),
			});
			dispatch(addQuoteToBook(quote, bookId));
		} catch (e) {
			showWarnToast(e);
		} finally {
			setLoading(false);
			navigation.goBack();
		}
	};

	const updateQuoteInFirestore = async (oldQuote: Quote, newQuote: Quote) => {
		try {
			await bookRef.update({
				quotes: firestore.FieldValue.arrayRemove(oldQuote),
			});
			dispatch(deleteQuote(bookId, quoteId));
			addQuoteToFirestore(newQuote);
		} catch (e) {
			showWarnToast(e);
		}
	};

	const deleteQuoteInFirestore = async () => {
		setLoading(true);

		try {
			await bookRef.update({
				quotes: firestore.FieldValue.arrayRemove(initialEditQuote),
			});

			dispatch(deleteQuote(bookId, quoteId));
		} catch (e) {
			showWarnToast(e);
		} finally {
			setLoading(false);
			navigation.goBack();
		}
	};

	const confirmDelete = () => {
		ActionSheet.show(
			{
				options: ["Yes", "No"],
				cancelButtonIndex: 1,
				destructiveButtonIndex: 0,
				title: "Are you sure to delete this quote ?",
			},
			(buttonIndex) => {
				if (buttonIndex === 0) {
					deleteQuoteInFirestore();
				}
			}
		);
	};

	const toggleCategory = (category: string) => {
		form.categories.includes(category)
			? setForm({
					...form,
					categories: form.categories.filter((c) => c !== category),
			  })
			: setForm({
					...form,
					categories: [...form.categories, category],
			  });
	};

	return (
		<View style={styles.content}>
			{loading ? (
				<ActivityIndicator size="large" />
			) : (
				<Form style={styles.form}>
					<QuoteForm
						categoriesCheck={form.categories}
						onPress={(val) => toggleCategory(val)}
						quote={form.quote}
						onChangeText={(value) => setForm({ ...form, quote: value })}
					/>
					<SafeAreaView style={styles.buttonsContainer}>
						<View style={{ flexDirection: "row" }}>
							<Button
								block
								success
								iconLeft
								style={styles.addButton}
								onPress={() => handleSubmit(form)}
							>
								<Icon type="Entypo" name={isEdit ? "edit" : "plus"} />
								<Text>{isEdit ? "Update Quote" : "Add Quote"}</Text>
							</Button>
						</View>
						<View style={styles.clearButtonsContainer}>
							<Button
								block
								light
								style={styles.clearButton}
								onPress={() =>
									setForm(isEdit ? initialEditQuote : initialQuote)
								}
							>
								<Text>Clear Form</Text>
							</Button>
							{isEdit && (
								<Button
									block
									danger
									iconLeft
									style={styles.deleteButton}
									onPress={confirmDelete}
								>
									<Icon type="Ionicons" name="md-trash" />
									<Text>Delete quote</Text>
								</Button>
							)}
						</View>
					</SafeAreaView>
				</Form>
			)}
		</View>
	);
};

export default AddQuoteScreen;
