import * as React from "react";
import {ScrollView, StyleSheet} from "react-native";
import {booksMock} from "../assets/mocks/books";
import BookListItem from "./BookListItem";

export default function BookList() {
	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
		>
			{booksMock.map((book) => (
				<BookListItem key={book.id} {...book} />
			))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	contentContainer: {
		alignItems: "center",
		paddingTop: 30,
	},
});
