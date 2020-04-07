import * as React from "react";
import {StyleSheet, View} from "react-native";
import BookList from "../components/BookList";

export default function BooksScreen() {
	return (
		<View style={styles.container}>
			<BookList />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		flex: 1,
	},
});
