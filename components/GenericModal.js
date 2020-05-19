import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Button, Icon, Title, Text } from "native-base";
import { StyleSheet, Modal, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";

function EditBookDetailsModal() {
	const [loading, setLoading] = useState(false);

	return (
		<Modal animationType="slide" transparent={true} visible={modalVisible}>
			<SafeAreaView style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<View style={{ ...StyleSheet.absoluteFillObject }}>
						<View style={styles.closeButtonContainer}>
							<Button
								onPress={() => {
									setModalVisible(false);
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
							<Text>Modal</Text>
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

export default EditBookDetailsModal;
