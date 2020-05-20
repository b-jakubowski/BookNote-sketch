import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text, CardItem, Card, ListItem, Body } from "native-base";
import { useNavigation } from "@react-navigation/native";

import Colors from "../constants/Colors";
import { Quote, Book } from "../interfaces/book.interface";

interface Props extends Book {
	id: string | number;
	quotes: Quote[];
}

const BookListItem: React.FC<Props> = ({
	id,
	cover,
	title,
	author,
	quotes,
}) => {
	const navigation = useNavigation();

	const navigateToBookDetails = () => {
		navigation.navigate("Book details", { id });
	};

	const bookCover = cover.length
		? { uri: cover }
		: require("../assets/images/book-cover-placeholder.jpg");

	return (
		<ListItem noIndent itemDivider style={styles.listItem}>
			<CardItem button onPress={() => navigateToBookDetails()}>
				<Image source={bookCover} style={styles.cardImg} />
				<View style={styles.bookDetails}>
					<Text style={styles.bookTitle}>{title}</Text>
					<Text note style={styles.bookAuthor}>
						{author}
					</Text>
					<Text note style={styles.bookAuthor}>
						Quotes: {quotes.length}
					</Text>
				</View>
			</CardItem>
		</ListItem>
	);
};

const styles = StyleSheet.create({
	bookAuthor: {
		fontSize: 15,
		marginBottom: 15,
	},
	bookDetails: {
		flex: 1,
		minHeight: 40,
	},
	bookTitle: {
		color: Colors.blackChocolate,
		fontSize: 20,
		marginBottom: 5,
	},
	cardImg: {
		flex: 1,
		height: 130,
		marginRight: 10,
		maxWidth: 90,
	},
	listItem: {
		marginBottom: -10,
		marginLeft: -5,
		backgroundColor: "transparent",
	},
});

export default BookListItem;
