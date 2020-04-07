import * as React from "react";
import PropTypes from "prop-types";
import {StyleSheet, View, Image} from "react-native";
import {Text, CardItem, Card} from "native-base";

export default function BookListItem({cover, name, author, quotes}) {
	return (
		<View style={styles.card}>
			<Card>
				<CardItem>
					<Image source={{uri: cover}} style={styles.cardImg} />
					<View style={styles.bookDetails}>
						<Text style={styles.bookTitle}>{name}</Text>
						<Text note style={styles.bookAuthor}>
							{author}
						</Text>
						<Text note style={styles.bookAuthor}>
							Quotes: {quotes.length}
						</Text>
					</View>
				</CardItem>
			</Card>
		</View>
	);
}

const styles = StyleSheet.create({
	bookAuthor: {
		marginBottom: 15,
	},
	bookDetails: {
		minHeight: 40,
	},
	bookTitle: {
		marginBottom: 5,
	},
	card: {
		width: "85%",
	},
	cardImg: {
		flex: 1,
		height: 130,
		marginRight: 10,
		maxWidth: 80,
	},
});

BookListItem.propTypes = {
	cover: PropTypes.string,
	name: PropTypes.string,
	author: PropTypes.string,
	quotes: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			categories: PropTypes.arrayOf(PropTypes.string),
			quote: PropTypes.string,
		})
	),
};
