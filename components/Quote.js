import React from "react";
import PropTypes from "prop-types";
import {CardItem, Body, Badge, Text} from "native-base";
import {StyledText} from "./StyledText";
import {View, StyleSheet} from "react-native";
import Colors from "../constants/Colors";

export default function Quote({quote, author, title}) {
	return (
		<CardItem bordered>
			<Body>
				<StyledText>"{quote.quote}"</StyledText>
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
		</CardItem>
	);
}

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
		backgroundColor: Colors.accentOrange,
		marginRight: 3,
	},
	categoryText: {
		fontSize: 12,
	},
});

Quote.propTypes = {
	quote: PropTypes.shape({
		quote: PropTypes.string,
		categories: PropTypes.arrayOf(PropTypes.string),
	}),
	author: PropTypes.string,
	title: PropTypes.string,
};
