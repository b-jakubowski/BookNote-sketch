import React, { useState } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import {
	Container,
	Content,
	Form,
	Text,
	Button,
	View,
	ActionSheet,
	Icon,
} from "native-base";
import { connect } from "react-redux";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import firebase from "firebase/app";

import QuoteForm from "../components/QuoteForm";
import { firestore } from "../constants/Firebase.js";
import { addQuoteToBook, deleteQuote } from "../store/actions/book";
import { StackParamList } from "./HomeScreen";
import { Quote } from "../interfaces/book.interface";
import { quoteSchema } from "../constants/Schemas";
import { showWarnToast } from "../helpers/Toast";
import { uuid } from "../helpers/uuid";

interface Props {
	route: RouteProp<StackParamList, "Add/Edit Quote">;
	addQuoteToBook: (quote: Quote, bookId: string) => void;
	deleteQuote: (bookId: string, quoteId: string) => void;
	navigation: StackNavigationHelpers;
}

const initialQuote: Quote = {
	quote: "",
	categories: [],
};

const AddQuoteScreen: React.FC<Props> = ({
	route,
	addQuoteToBook,
	deleteQuote,
	navigation,
}) => {
	const { bookId, quoteId, isEdit } = route.params;
	const [loading, setLoading] = useState(false);
	const initialEditQuote = {
		id: quoteId,
		quote: route.params.quote,
		categories: route.params.categories,
	};
	const bookRef = firestore.collection("books").doc(bookId);

	const [form, setForm] = useState(isEdit ? initialEditQuote : initialQuote);

	const handleSubmit = ({ quote, categories }: Quote) => {
		const newQuote: Quote = { categories, quote };

		isEdit ? (newQuote.id = quoteId) : (newQuote.id = uuid());

		quoteSchema
			.validate(form, { abortEarly: false })
			.then(() => {
				isEdit
					? updateQuoteInFirestore(initialEditQuote, newQuote)
					: addQuoteToFirestore(newQuote);
			})
			.catch((e) => showWarnToast(e.errors.join(",\r\n")));
	};

	const addQuoteToFirestore = (quote: Quote) => {
		setLoading(true);

		bookRef
			.update({
				quotes: firebase.firestore.FieldValue.arrayUnion(quote),
			})
			.then(() => addQuoteToBook(quote, bookId))
			.catch()
			.finally(() => {
				setLoading(false);
				navigation.goBack();
			});
	};

	const updateQuoteInFirestore = (oldQuote: Quote, newQuote: Quote) => {
		bookRef
			.update({
				quotes: firebase.firestore.FieldValue.arrayRemove(oldQuote),
			})
			.then(() => {
				deleteQuote(bookId, quoteId);
				addQuoteToFirestore(newQuote);
			})
			.catch();
	};

	const deleteQuoteInFirestore = () => {
		setLoading(true);

		bookRef
			.update({
				quotes: firebase.firestore.FieldValue.arrayRemove(initialEditQuote),
			})
			.then(() => deleteQuote(bookId, quoteId))
			.catch()
			.finally(() => {
				setLoading(false);
				navigation.goBack();
			});
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
		<Container>
			<Content style={styles.content}>
				{loading ? (
					<ActivityIndicator size="large" />
				) : (
					<Form>
						<QuoteForm
							categoriesCheck={form.categories}
							onPress={(val) => toggleCategory(val)}
							quote={form.quote}
							onChangeText={(value) => setForm({ ...form, quote: value })}
						/>
						<Button
							block
							success
							iconLeft
							style={styles.addButton}
							onPress={() => handleSubmit(form)}
						>
							<Icon type="Entypo" name="edit" />
							<Text>{isEdit ? "Update Quote" : "Add Quote"}</Text>
						</Button>
						<View style={styles.buttonsContainer}>
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
									onPress={() => confirmDelete()}
								>
									<Icon type="Ionicons" name="md-trash" />
									<Text>Delete quote</Text>
								</Button>
							)}
						</View>
					</Form>
				)}
			</Content>
		</Container>
	);
};

const styles = StyleSheet.create({
	addButton: {
		flex: 1.5,
		margin: 5,
	},
	buttonsContainer: {
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
		padding: 10,
	},
	deleteButton: {
		flex: 0.8,
		margin: 5,
	},
	formItem: {
		marginBottom: 15,
	},
});

export default connect(null, { addQuoteToBook, deleteQuote })(AddQuoteScreen);
