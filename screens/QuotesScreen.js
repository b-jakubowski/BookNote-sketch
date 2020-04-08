import * as React from "react";
import {ScrollView, StyleSheet, Text} from "react-native";

export default function QuotesScreen() {
	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
		>
			<Text>Quotes screen works</Text>
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
