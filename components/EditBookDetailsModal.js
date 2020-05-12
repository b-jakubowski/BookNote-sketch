import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	View,
	Button,
	Icon,
	Title,
	Form,
	Text,
	Toast,
	ActionSheet,
} from "native-base";
import { StyleSheet, Modal, ActivityIndicator } from "react-native";
import BookDetailsFields from "./BookDetailsFields";
import { firestore } from "../constants/Firebase";
import { connect } from "react-redux";
import { deleteBook, updateBookDetails } from "../store/actions/book";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";
import * as yup from "yup";
import { bookDetailsSchema } from "../constants/Schemas";

function EditBookDetailsModal({
	id,
	initialBookValues,
	setModalVisible,
	modalVisible,
	deleteBook,
	updateBookDetails,
}) {
	const [form, setForm] = useState(initialBookValues);
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation();
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
				setModalVisible(false);
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
				setModalVisible(false);
				updateBookDetails(id, form);
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
		<Modal animationType="slide" transparent={true} visible={modalVisible}>
			<SafeAreaView style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<View style={{ ...StyleSheet.absoluteFillObject }}>
						<View style={styles.closeButtonContainer}>
							<Button
								onPress={() => {
									setModalVisible(false);
									setForm(initialBookValues);
								}}
								block
								rounded
								transparent
							>
								<Icon
									ios="ios-close-circle-outline"
									android="md-close-circle-outline"
								/>
							</Button>
						</View>
					</View>
					<Title>Edit book details</Title>
					{loading ? (
						<View style={styles.activityIndicatorContainer}>
							<ActivityIndicator size="large" />
						</View>
					) : (
						<>
							<Form style={styles.formItem}>
								<BookDetailsFields
									name={form.name}
									author={form.author}
									cover={form.cover}
									status={form.status}
									setForm={setForm}
									form={form}
								/>
							</Form>
							<View style={styles.buttonsContainer}>
								<Button
									title="submit"
									block
									success
									style={styles.button}
									onPress={() => handleSubmit()}
								>
									<Text>Change book details</Text>
								</Button>
								<Button
									title="submit"
									block
									danger
									style={styles.button}
									onPress={() => confirmDelete()}
								>
									<Text>Delete book</Text>
								</Button>
							</View>
						</>
					)}
				</View>
			</SafeAreaView>
		</Modal>
	);
}

const styles = StyleSheet.create({
	activityIndicatorContainer: {
		flex: 1,
		justifyContent: "center",
	},
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 15,
		width: "100%",
	},
	closeButtonContainer: {
		flexDirection: "row",
		justifyContent: "flex-end",
		margin: 10,
	},
	formItem: {
		marginTop: 50,
		width: "100%",
	},
	modalContainer: {
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.3)",
		flex: 1,
		justifyContent: "center",
	},
	modalContent: {
		alignItems: "center",
		backgroundColor: "white",
		height: "60%",
		padding: 20,
		width: "90%",
	},
});

EditBookDetailsModal.propTypes = {
	id: PropTypes.string,
	initialBookValues: PropTypes.object,
	setModalVisible: PropTypes.func,
	modalVisible: PropTypes.bool,
	deleteBook: PropTypes.func,
	updateBookDetails: PropTypes.func,
};

export default connect(null, { deleteBook, updateBookDetails })(
	EditBookDetailsModal
);
