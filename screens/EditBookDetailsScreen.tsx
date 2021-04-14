import React, { useState, useEffect } from "react";
import { Text, ActionSheet, Button, Icon } from "native-base";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { RouteProp } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";

import { deleteBook, updateBookDetails } from "../store/actions/book";
import BookDetailsFields from "../components/BookDetailsFields";
import { showWarnToast } from "../helpers/Toast";
import { bookDetailsSchema } from "../constants/Schemas";
import { StackParamList } from "../navigation/types";

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
	deleteButton: {
		flex: 0.7,
		marginLeft: 15,
	},
});

interface Props {
	navigation: StackNavigationHelpers;
	route: RouteProp<StackParamList, "Edit book details">;
}

const EditBookDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
	const { id, initialBookValues } = route.params;
	const [form, setForm] = useState(initialBookValues);
	const [loading, setLoading] = useState(false);
	const bookRef = firestore().collection("books").doc(id);
	const dispatch = useDispatch();

	useEffect(() => {
		if (initialBookValues.cover.length) {
			setForm({ ...form, cover: initialBookValues.cover });
		}
	}, [initialBookValues]);

	const handleDelete = async () => {
		setLoading(true);

		try {
			await bookRef.delete();
			dispatch(deleteBook(id));
		} catch (e) {
			showWarnToast(e);
		} finally {
			setLoading(false);
			navigation.navigate("Books");
		}
	};

	const handleSubmit = async () => {
		setLoading(true);

		try {
			await bookDetailsSchema.validate(form, { abortEarly: false });
			submitBookDetails();
		} catch (e) {
			showWarnToast(e);
		} finally {
			setLoading(false);
		}
	};

	const submitBookDetails = async () => {
		setLoading(true);

		try {
			await bookRef.update({
				title: form.title,
				author: form.author,
				cover: form.cover,
				status: form.status,
			});
		} catch (e) {
			showWarnToast(e);
		} finally {
			setLoading(false);
			dispatch(updateBookDetails(id, form));
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
					handleDelete();
				}
			}
		);
	};

	return (
		<>
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
		</>
	);
};

export default EditBookDetailsScreen;
