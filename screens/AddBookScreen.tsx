import React, { useState, useEffect } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { Text, Button, View, Icon } from "native-base";
import { RouteProp } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import firestore from "@react-native-firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";

import { addBook } from "../store/actions/book";
import BookDetailsFields from "../components/BookDetailsFields";
import { Book, BookDetails, Status } from "../interfaces/book.interface";
import { Store } from "../store/store";
import { showWarnToast } from "../helpers/Toast";
import { bookDetailsSchema } from "../constants/Schemas";
import { StackParamList } from "../navigation/types";

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
interface Props {
	route: RouteProp<StackParamList, "Add book">;
	navigation: StackNavigationHelpers;
}

const initialForm: BookDetails = {
	title: "",
	author: "",
	cover: "",
	status: Status.TO_READ,
};

const AddBookScreen: React.FC<Props> = ({ route, navigation }) => {
	const [form, setForm] = useState(initialForm);
	const [loading, setLoading] = useState(false);
	const user = useSelector((state: Store) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		if (route.params && route.params.uri) {
			setForm({ ...form, cover: route.params.uri });
		}
	}, [route.params]);

	const handleCreateBook = async (book: Book) => {
		try {
			const docRef = await firestore().collection("books").add(book);
			const doc = await docRef.get();

			dispatch(
				addBook({
					id: doc.id,
					...doc.data(),
				} as Book)
			);

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

	const validateFormAndCreateBook = async (book: Book) => {
		try {
			setLoading(true);
			await bookDetailsSchema.validate(form, { abortEarly: false });
			handleCreateBook(book);
		} catch (e) {
			showWarnToast(e);
		} finally {
			setLoading(false);
		}
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

export default AddBookScreen;
