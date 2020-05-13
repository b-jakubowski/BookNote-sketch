import React, { useState } from "react";
import {
	Container,
	Content,
	Text,
	ActionSheet,
	Toast,
	Form,
	Button,
	Icon,
} from "native-base";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { connect } from "react-redux";
import * as yup from "yup";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { RouteProp } from "@react-navigation/native";

import { deleteBook, updateBookDetails } from "../store/actions/book";
import { firestore } from "../constants/Firebase";
import { bookDetailsSchema } from "../constants/Schemas";
import BookDetailsFields from "../components/BookDetailsFields";
import { BookDetails } from "../interfaces/book.interface";
import { StackParamList } from "./HomeScreen";

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

	const handleDelete = () => {
		setLoading(true);

		bookRef
			.delete()
			.then(() => {
				deleteBook(id);
			})
			.catch((e) => {
				Toast.show({
					text: e.errors,
					buttonText: "Okay",
					type: "warning",
					duration: 10000000,
				});
			})
			.finally(() => {
				setLoading(false);
				navigation.navigate("Books");
			});
	};

	const handleSubmit = () => {
		setLoading(true);

		yup
			.object({ ...bookDetailsSchema })
			.validate(form, { abortEarly: false })
			.then(() => submitBookDetails())
			.catch((e) => {
				Toast.show({
					text: e.errors.join(",\r\n"),
					buttonText: "Okay",
					type: "warning",
					duration: 10000000,
				});
			});
	};

	const submitBookDetails = () => {
		bookRef
			.update({
				name: form.name,
				author: form.author,
				cover: form.cover,
				status: form.status,
			})
			.catch()
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
		<Container>
			<Content style={styles.content}>
				{loading ? (
					<View style={styles.activityIndicatorContainer}>
						<ActivityIndicator size="large" />
					</View>
				) : (
					<>
						<Form>
							<BookDetailsFields
								name={form.name}
								author={form.author}
								cover={form.cover}
								status={form.status}
								isEdit={true}
								setForm={setForm}
								form={form}
							/>
						</Form>
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
			</Content>
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