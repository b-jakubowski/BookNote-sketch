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
import { firestore } from "../constants/Firebase";
import BookDetailsFields from "../components/BookDetailsFields";
import { User } from "../interfaces/user.interface";
import { Book, BookDetails, Status } from "../interfaces/book.interface";
import { Store } from "../store/store";
import { showWarnToast } from "../helpers/Toast";
import { StackParamList } from "./HomeScreen";

interface Props {
	user: User;
	addBook: (book: Book) => void;
	route: RouteProp<StackParamList, "Add book">;
	navigation: StackNavigationHelpers;
}

const initialForm: BookDetails = {
	title: "",
	author: "",
	cover: "",
	status: Status.NONE,
};

const bookDetailsSchema = yup.object({
	title: yup.string().required().min(2),
	author: yup.string().required().min(2),
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

			addBook({
				id: doc.id,
				...doc.data(),
			} as Book);

			navigation.navigate("Book details", { id: doc.id });
		} catch (e) {
			showWarnToast(e);
		} finally {
			setForm(initialForm);
			setLoading(false);
		}
	};

	const handleSubmit = ({ ...book }: BookDetails) => {
		const newBook =
			{
				...book,
				createdAt: new Date(),
				userId: user.uid,
			} as Book;

		validateFormAndCreateBook(newBook);
	};

	const validateFormAndCreateBook = (book: Book) => {
		setLoading(true);

		bookDetailsSchema
			.validate(form, { abortEarly: false })
			.then(() => handleCreateBook(book))
			.catch((e) => {
				setLoading(false);
				showWarnToast(e.errors.join(",\r\n"));
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
							title={form.title}
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
