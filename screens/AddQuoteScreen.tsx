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
import { useNavigation, RouteProp } from "@react-navigation/native";
import firebase from "firebase/app";

import CategoryCheckBox from "../components/CategoryCheckBox";
import QuoteForm from "../components/QuoteForm";
import { firestore } from "../constants/Firebase.js";
import { addQuoteToBook, deleteQuote } from "../store/actions/book";
import { StackParamList } from "./HomeScreen";
import { Quote } from "../interfaces/book.interface";
import { quoteSchema } from "../constants/Schemas";
import { showWarnToast } from "../helpers/Toast";

interface Props {
	route: RouteProp<StackParamList, "Add/Edit Quote">;
	addQuoteToBook: (quote: Quote, bookId: number | string) => void;
	deleteQuote: (bookId: string, quoteId: string) => void;
}

interface Categories {
	[key: string]: boolean;
}

const initialForm = {
	quote: "",
	categories: {
		motivation: false,
		love: false,
		wisdom: false,
		time: false,
		happiness: false,
		funny: false,
		success: false,
		productivity: false,
	},
};

const categoriesMapped = (categories: Categories) =>
	Object.keys(categories).filter((category) => categories[category]);

const setInitialFormEdit = (quote: string, categories: string[]) => {
	const initialFormEdit = {
		quote,
		categories: {
			...initialForm.categories,
		},
	};

	if (categories) {
		categories.forEach(
			(category) =>
				((initialFormEdit.categories as Categories)[category] = true)
		);
	}

	return initialFormEdit;
};

const AddQuoteScreen: React.FC<Props> = ({
	route,
	addQuoteToBook,
	deleteQuote,
}) => {
	const { bookId, quoteId, isEdit } = route.params;
	const [loading, setLoading] = useState(false);
	const initialFormEdit = setInitialFormEdit(
		route.params.quote,
		route.params.categories
	);
	const initialQuote = {
		id: quoteId,
		categories: categoriesMapped(initialFormEdit.categories),
		quote: initialFormEdit.quote,
	};
	const bookRef = firestore.collection("books").doc(bookId);

	const [form, setForm] = useState(isEdit ? initialFormEdit : initialForm);
	const navigation = useNavigation();

	const handleSubmit = ({
		quote,
		categories,
	}: {
		quote: string;
		categories: Categories;
	}) => {
		const newQuote: Quote = {
			id: "",
			categories: categoriesMapped(categories),
			quote,
		};

		isEdit ? (newQuote.id = quoteId) : (newQuote.id = `${Math.random()}`);

		quoteSchema
			.validate(form, { abortEarly: false })
			.then(() => {
				isEdit
					? updateQuoteInFirestore(initialQuote, newQuote)
					: addQuoteToFirestore(newQuote);
			})
			.catch((e) => {
				showWarnToast(e.errors.join(",\r\n"));
			});
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
				quotes: firebase.firestore.FieldValue.arrayRemove(initialQuote),
			})
			.then(() => deleteQuote(bookId, quoteId))
			.catch()
			.finally(() => {
				setLoading(false);
				navigation.goBack();
			});
	};

	const toggleCategory = (category) => {
		setForm({
			...form,
			categories: {
				...form.categories,
				[category]: !form.categories[category],
			},
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

	return (
		<Container>
			<Content style={styles.content}>
				{loading ? (
					<ActivityIndicator size="large" />
				) : (
					<Form>
						<View style={styles.formItem}>
							<Text note>Categories</Text>
							<View style={styles.categories}>
								{Object.keys(initialForm.categories).map((category, index) => (
									<View key={index}>
										<CategoryCheckBox
											category={category}
											checked={form.categories[category]}
											onPress={() => toggleCategory(category)}
										/>
									</View>
								))}
							</View>
						</View>
						<QuoteForm
							categories={form.categories}
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
								onPress={() => setForm(isEdit ? initialFormEdit : initialForm)}
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
