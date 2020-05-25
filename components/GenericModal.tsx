import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Button, Icon, Title, Text } from "native-base";
import { StyleSheet, Modal, ActivityIndicator } from "react-native";

function EditBookDetailsModal({ modalVisible }: { modalVisible: true }) {
	const [loading, setLoading] = useState(false);

	return (
		<Modal animationType="slide" transparent={true} visible={modalVisible}>
			<SafeAreaView style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<View style={{ ...StyleSheet.absoluteFillObject }}>
						<View style={styles.closeButtonContainer}>
							<Button onPress={() => {}} block rounded transparent>
								<Icon type="Ionicons" name="md-close-circle-outline" />
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

export default EditBookDetailsModal;
