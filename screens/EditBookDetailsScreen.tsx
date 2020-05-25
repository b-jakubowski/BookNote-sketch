import React, { useState, useEffect } from "react";
import { Text, ActionSheet, Button, Icon, Container } from "native-base";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { RouteProp } from "@react-navigation/native";

import { deleteBook, updateBookDetails } from "../store/actions/book";
import { firestore } from "../constants/Firebase";
import BookDetailsFields from "../components/BookDetailsFields";
import { BookDetails } from "../interfaces/book.interface";
import { StackParamList } from "./HomeScreen";
import { showWarnToast } from "../helpers/Toast";
import { bookDetailsSchema } from "../constants/Schemas";

interface Props {
	deleteBook: (bookId: string) => void;
	updateBookDetails: (bookId: string, details: BookDetails) => void;
	navigation: StackNavigationHelpers;
	route: RouteProp<StackParamList, "Edit book details">;
}

const EditBookDetailsScreen: React.FC<Props> = ({
	deleteBook,
	updateBookDetails,
	navigation,
	route,
}) => {
	const { id, initialBookValues } = route.params;
	const [form, setForm] = useState(initialBookValues);
	const [loading, setLoading] = useState(false);
	const bookRef = firestore.collection("books").doc(id);

	useEffect(() => {
		if (initialBookValues.cover.length) {
			setForm({ ...form, cover: initialBookValues.cover });
		}
	}, [initialBookValues]);

	const handleDelete = () => {
		setLoading(true);

		bookRef
			.delete()
			.then(() => {
				deleteBook(id);
			})
			.catch((e) => showWarnToast(e.errors))
			.finally(() => {
				setLoading(false);
				navigation.navigate("Books");
			});
	};

	const handleSubmit = () => {
		setLoading(true);

		bookDetailsSchema
			.validate(form, { abortEarly: false })
			.then(() => submitBookDetails())
			.catch((e) => showWarnToast(e.errors.join(",\r\n")));
	};

	const submitBookDetails = () => {
		bookRef
			.update({
				title: form.title,
				author: form.author,
				cover: form.cover,
				status: form.status,
			})
			.catch((e) => showWarnToast(e))
			.finally(() => {
				setLoading(false);
				updateBookDetails(id, form);
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
					handleDelete();
				}
			}
		);
	};

	return (
		<Container style={styles.content}>
			{loading ? (
				<View style={styles.activityIndicatorContainer}>
					<ActivityIndicator size="large" />
				</View>
			) : (
				<>
					<View>
						<BookDetailsFields
							id={id}
							title={form.title}
							author={form.author}
							cover={form.cover}
							status={form.status}
							isEdit={true}
							setForm={setForm}
							form={form}
						/>
					</View>
					<View style={styles.buttonsContainer}>
						<Button
							block
							success
							iconLeft
							style={styles.changeButton}
							onPress={() => handleSubmit()}
						>
							<Icon type="Entypo" name="edit" />
							<Text>Change book details</Text>
						</Button>
						<Button
							block
							danger
							iconLeft
							style={styles.deleteButton}
							onPress={() => confirmDelete()}
						>
							<Icon type="Ionicons" name="md-trash" />
							<Text>Delete book</Text>
						</Button>
					</View>
				</>
			)}
		</Container>
	);
};

const styles = StyleSheet.create({
	activityIndicatorContainer: {
		flex: 1,
		justifyContent: "center",
	},
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 40,
	},
	changeButton: {
		flex: 1,
	},
	content: {
		padding: 10,
	},
	deleteButton: {
		flex: 0.7,
		marginLeft: 15,
	},
});

export default connect(null, { deleteBook, updateBookDetails })(
	EditBookDetailsScreen
);
