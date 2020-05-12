import React, { useState } from "react";
import PropTypes from "prop-types";
import { StyleSheet, ActivityIndicator } from "react-native";
import {
	Container,
	Content,
	Form,
	Text,
	Toast,
	Button,
	View,
	ActionSheet,
	Icon,
} from "native-base";
import { connect } from "react-redux";
import * as yup from "yup";
import { addQuoteToBook, deleteQuote } from "../store/actions/book";
import { useNavigation } from "@react-navigation/native";
import CategoryCheckBox from "../components/CategoryCheckBox";
import QuoteForm from "../components/QuoteForm";
import { firestore } from "../constants/Firebase.js";
import firebase from "firebase/app";

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

const quoteSchema = yup.object({
	quote: yup.string().required().min(5),
	categories: yup.object({
		motivation: yup.boolean(),
		love: yup.boolean(),
		wisdom: yup.boolean(),
		time: yup.boolean(),
		happiness: yup.boolean(),
		funny: yup.boolean(),
		success: yup.boolean(),
		productivity: yup.boolean(),
	}),
});

const categoriesMapped = (categories) =>
	Object.keys(categories).filter((category) => categories[category]);

const setInitialFormEdit = (quote, categories) => {
	const initialFormEdit = {
		quote,
		categories: {
			...initialForm.categories,
		},
	};

	if (categories) {
		categories.forEach(
			(category) => (initialFormEdit.categories[category] = true)
		);
	}

	return initialFormEdit;
};

function AddQuoteScreen({ route, addQuoteToBook, deleteQuote }) {
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

	const handleSubmit = ({ quote, categories }) => {
		const newQuote = {
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
				Toast.show({
					text: e.errors.join(",\r\n"),
					buttonText: "Okay",
					type: "warning",
					duration: 10000000,
				});
			});
	};

	const addQuoteToFirestore = (quote) => {
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

	const updateQuoteInFirestore = (oldQuote, newQuote) => {
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
							title="submit"
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
								title="clear"
								block
								light
								style={styles.clearButton}
								onPress={() => setForm(isEdit ? initialFormEdit : initialForm)}
							>
								<Text>Clear Form</Text>
							</Button>
							{isEdit && (
								<Button
									title="delete"
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
}

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

AddQuoteScreen.propTypes = {
	addQuoteToBook: PropTypes.func,
	deleteQuote: PropTypes.func,
	route: PropTypes.object,
};

export default connect(null, { addQuoteToBook, deleteQuote })(AddQuoteScreen);
