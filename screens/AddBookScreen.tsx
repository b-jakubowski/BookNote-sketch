import React, { useState, useEffect } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import {
	Container,
	Content,
	Form,
	Text,
	Button,
	View,
	Icon,
} from "native-base";
import { RouteProp } from "@react-navigation/native";
import { connect } from "react-redux";
import * as yup from "yup";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";

import { addBook } from "../store/actions/book";
import QuoteForm from "../components/QuoteForm";
import { firestore } from "../constants/Firebase";
import BookDetailsFields from "../components/BookDetailsFields";
import { bookDetailsSchema } from "../constants/Schemas";
import { User } from "../interfaces/user.interface";
import { Book, BookDetails } from "../interfaces/book.interface";
import { BottomStackParamList } from "../navigation/BottomTabNavigator";
import { Store } from "../store/store";
import { showWarnToast } from "../helpers/Toast";

interface Props {
	user: User;
	addBook: (book: Book) => void;
	route: RouteProp<BottomStackParamList, "Add Book">;
	navigation: StackNavigationHelpers;
}

export interface BookForm extends BookDetails {
	quote: string;
	categories: string[];
}

const initialForm: BookForm = {
	name: "",
	author: "",
	cover: "",
	status: "",
	quote: "",
	categories: [],
};

const bookSchema = yup.object({
	...bookDetailsSchema,
	categories: yup.array().of(yup.string()),
	quote: yup.string().required().min(5),
});

const AddBookScreen: React.FC<Props> = ({
	user,
	addBook,
	route,
	navigation,
}) => {
	const [form, setForm] = useState(initialForm);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (route.params && route.params.uri) {
			setForm({ ...form, cover: route.params.uri });
		}
	}, [route.params]);

	const handleCreateBook = async (book: Book) => {
		try {
			const docRef = await firestore.collection("books").add(book);
			const doc = await docRef.get();

			const bookFirestore =
				{
					id: doc.id,
					...doc.data(),
				} as Book;

			addBook(bookFirestore);
		} catch (e) {
			showWarnToast(e);
		} finally {
			setForm(initialForm);
			setLoading(false);
			navigation.navigate("Books");
		}
	};

	const handleSubmit = ({ quote, categories, ...book }: BookForm) => {
		const newBook =
			{
				...book,
				createdAt: new Date(),
				userId: user.uid,
				quotes: [
					{
						id: `${Math.random()}`,
						categories,
						quote,
					},
				],
			} as Book;

		validateFormAndCreateBook(newBook);
	};

	const validateFormAndCreateBook = (book: Book) => {
		setLoading(true);

		bookSchema
			.validate(form, { abortEarly: false })
			.then(() => handleCreateBook(book))
			.catch((e) => {
				setLoading(false);
				showWarnToast(e.errors.join(",\r\n"));
			});
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
		<>
			{loading ? (
				<ActivityIndicator size="large" />
			) : (
				<Container>
					<View>
						<BookDetailsFields
							name={form.name}
							author={form.author}
							cover={form.cover}
							status={form.status}
							isEdit={false}
							setForm={setForm}
							form={form}
						/>
					</View>
					<Content style={styles.content}>
						<Form>
							<QuoteForm
								categoriesCheck={form.categories}
								onPress={(val) => toggleCategory(val)}
								quote={form.quote}
								onChangeText={(value) => setForm({ ...form, quote: value })}
							/>
							<View style={styles.buttonsContainer}>
								<Button
									success
									block
									iconLeft
									style={styles.addButton}
									onPress={() => handleSubmit(form)}
								>
									<Icon type="AntDesign" name="pluscircle" />
									<Text>Add Book</Text>
								</Button>
								<Button
									block
									light
									style={styles.clearButton}
									onPress={() => setForm(initialForm)}
								>
									<Text>Clear Form</Text>
								</Button>
							</View>
						</Form>
					</Content>
				</Container>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	addButton: {
		flex: 1.5,
		margin: 5,
	},
	buttonsContainer: {
		flexDirection: "row",
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
});

const mapStateToProps = (state: Store) => ({
	user: state.auth,
});

export default connect(mapStateToProps, {
	addBook,
})(AddBookScreen);
