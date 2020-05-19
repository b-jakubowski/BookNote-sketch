import React from "react";
import { Body, Badge, Text } from "native-base";
import { StyledText } from "./StyledText";
import { View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { Quote } from "../interfaces/book.interface";

interface Props {
	quote: Quote;
	author?: string;
	title?: string;
}

const QuoteItem: React.FC<Props> = ({ quote, author, title }) => {
	return (
		<Body>
			<StyledText style={styles.quoteText}>"{quote.quote}"</StyledText>
			{author && title && (
				<Text note style={styles.authorTitle}>
					{author}, {title}
				</Text>
			)}
			<View style={styles.categories}>
				{quote.categories.map((category, index) => (
					<Badge key={index} style={styles.categoryBadge}>
						<Text style={styles.categoryText}>{category}</Text>
					</Badge>
				))}
			</View>
		</Body>
	);
};

const styles = StyleSheet.create({
	authorTitle: {
		fontSize: 12,
		marginVertical: 3,
	},
	categories: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginTop: 5,
	},
	categoryBadge: {
		backgroundColor: Colors.lightOrange,
		marginRight: 5,
		marginTop: 3,
	},
	categoryText: {
		color: Colors.blackChocolate,
		fontSize: 12,
	},
	quoteText: {
		fontSize: 16,
	},
});

export default QuoteItem;
