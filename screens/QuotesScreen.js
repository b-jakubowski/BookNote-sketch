import * as React from "react";
import {ScrollView, StyleSheet, Text} from "react-native";
import {booksMock} from "../assets/mocks/books";
import Quote from "../components/Quote";

export default function QuotesScreen() {
	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
		>
			{booksMock.map((book) =>
				book.quotes.map((quote) => (
					<Quote
						key={quote.id}
						quote={quote}
						author={book.author}
						title={book.name}
					/>
				))
			)}
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
