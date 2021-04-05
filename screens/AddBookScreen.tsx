import React, { useState, useEffect } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { Content, Form, Text, Button, View, Icon } from "native-base";
import { RouteProp } from "@react-navigation/native";
import { connect } from "react-redux";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";

import { addBook } from "../store/actions/book";
import firestore from "@react-native-firebase/firestore";
import BookDetailsFields from "../components/BookDetailsFields";
import { User } from "../interfaces/user.interface";
import { Book, BookDetails, Status } from "../interfaces/book.interface";
import { Store } from "../store/store";
import { showWarnToast } from "../helpers/Toast";
import { bookDetailsSchema } from "../constants/Schemas";
import { StackParamList } from "../navigation/types";
import { SafeAreaView } from "react-native-safe-area-context";

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
			const docRef = await firestore().collection("books").add(book);
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
				<View style={styles.container}>
					<BookDetailsFields
						title={form.title}
						author={form.author}
						cover={form.cover}
						status={form.status}
						isEdit={false}
						setForm={setForm}
						form={form}
					/>

					<SafeAreaView>
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
								info
								style={styles.clearButton}
								onPress={() => setForm(initialForm)}
							>
								<Text>Clear Form</Text>
							</Button>
						</View>
					</SafeAreaView>
				</View>
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
	clearButton: {
		flex: 1,
		margin: 5,
	},
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-between",
	},
});

const mapStateToProps = (state: Store) => ({
	user: state.auth,
});

export default connect(mapStateToProps, {
	addBook,
})(AddBookScreen);
