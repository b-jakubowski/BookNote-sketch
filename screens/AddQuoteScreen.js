import * as React from "react";
import {ScrollView, StyleSheet, Text} from "react-native";

export default function AddQuoteScreen() {
	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
		>
			<Text>Add Quote screen works</Text>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fafafa",
		flex: 1,
	},
	contentContainer: {
		paddingTop: 15,
	},
});
