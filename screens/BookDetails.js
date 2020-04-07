import * as React from "react";
import {ScrollView, StyleSheet, View, Image} from "react-native";
import PropTypes from "prop-types";
import {Container, Body, Text, Card, CardItem, Badge} from "native-base";
import {MonoText} from "../components/StyledText";
import Colors from "../constants/Colors";

export default function BookDetails({route}) {
	const {cover, name, author, quotes} = route.params;

	return (
		<Container>
			<Card>
				<CardItem header bordered>
					<Image source={{uri: cover}} style={styles.cardImg} />
					<View>
						<Text>{name}</Text>
						<Text note>{author}</Text>
					</View>
				</CardItem>
				<ScrollView>
					{quotes.map((quote) => (
						<CardItem key={quote.id} bordered>
							<Body>
								<MonoText>{quote.quote}</MonoText>
								<View style={styles.categories}>
									{quote.categories.map((category, index) => (
										<Badge key={index} style={styles.categoryBadge}>
											<Text style={styles.categoryText}>{category}</Text>
										</Badge>
									))}
								</View>
							</Body>
						</CardItem>
					))}
				</ScrollView>
			</Card>
		</Container>
	);
}

const styles = StyleSheet.create({
	cardImg: {
		flex: 1,
		height: 70,
		marginRight: 10,
		maxWidth: 40,
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

BookDetails.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
	}),
	route: PropTypes.object,
};
