import React from "react";
import {ScrollView, StyleSheet, View, Image} from "react-native";
import PropTypes from "prop-types";
import {
	Container,
	Text,
	Card,
	CardItem,
	Button,
	Content,
	Fab,
	Icon,
} from "native-base";
import Quote from "../components/Quote";

export default function BookDetailsScreen({route, ...props}) {
	const {id, cover, name, author, quotes, status} = route.params;

	const navigateToEditQuote = () => {
		props.navigation.navigate("EditQuote", {id});
	};

	return (
		<Container>
			<Card>
				<CardItem header bordered>
					<Image source={{uri: cover}} style={styles.cardImg} />
					<View style={styles.bookDescription}>
						<Text>{name}</Text>
						<Text note>{author}</Text>
						<Text note>Status: {status}</Text>
					</View>
					<View style={styles.editQuoteContainer}>
						<Button small block onPress={() => console.log("Edit book")}>
							<Text>Edit book</Text>
						</Button>
					</View>
				</CardItem>
			</Card>
			<Content>
				<Card>
					<CardItem>
						<ScrollView style={styles.scrollContainer}>
							{quotes.map((quote) => (
								<Quote key={quote.id} quote={quote} />
							))}
						</ScrollView>
					</CardItem>
				</Card>
			</Content>
			<Fab
				button
				position="bottomRight"
				secondary
				onPress={() => navigateToEditQuote()}
			>
				<Icon name="add" />
			</Fab>
		</Container>
	);
}

const styles = StyleSheet.create({
	bookDescription: {
		flex: 2,
	},
	cardImg: {
		flex: 1,
		height: 70,
		marginRight: 10,
		maxWidth: 40,
	},
	editQuoteContainer: {
		flex: 1,
	},
});

BookDetailsScreen.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
	}),
	route: PropTypes.object,
};
