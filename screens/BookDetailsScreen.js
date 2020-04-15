import React from "react";
import {ScrollView, StyleSheet, View, Image} from "react-native";
import PropTypes from "prop-types";
import {Container, Text, Card, CardItem, Button} from "native-base";
import Quote from "../components/Quote";

export default function BookDetailsScreen({route, ...props}) {
	const {id, cover, name, author, quotes} = route.params;

	const navigateToEditQuote = () => {
		props.navigation.navigate("EditQuote", {id});
	};

	return (
		<Container>
			<Card>
				<CardItem header bordered>
					<Image source={{uri: cover}} style={styles.cardImg} />
					<View>
						<Text>{name}</Text>
						<Text note>{author}</Text>
					</View>
					<View style={styles.addQuoteContainer}>
						<Button small block onPress={() => navigateToEditQuote()}>
							<Text>Add quote</Text>
						</Button>
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
	addQuoteContainer: {
		flex: 1,
		paddingHorizontal: 20,
	},
	cardImg: {
		flex: 1,
		height: 70,
		marginRight: 10,
		maxWidth: 40,
	},
});

BookDetailsScreen.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
	}),
	route: PropTypes.object,
};
