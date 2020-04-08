import React from "react";
import {ScrollView, StyleSheet, View, Image} from "react-native";
import PropTypes from "prop-types";
import {Container, Text, Card, CardItem} from "native-base";
import Quote from "../components/Quote";

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
						<Quote key={quote.id} quote={quote} />
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
});

BookDetails.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
	}),
	route: PropTypes.object,
};
