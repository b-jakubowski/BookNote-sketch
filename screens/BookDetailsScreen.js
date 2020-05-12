import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import PropTypes from "prop-types";
import {
	Container,
	Text,
	Card,
	CardItem,
	Button,
	Fab,
	Icon,
	ListItem,
} from "native-base";
import { connect } from "react-redux";
import QuoteItem from "../components/QuoteItem";
import Colors from "../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

function BookDetailsScreen({ route, books, navigation }) {
	const { id } = route.params;
	const { cover, name, author, quotes, status } =
		books.filter((book) => book.id === id)[0] || {};

	const navigateToAddQuote = () => {
		navigation.navigate("Add/Edit Quote", { bookId: id });
	};

	const bookCover = cover
		? { uri: cover }
		: require("../assets/images/book-cover-placeholder.jpg");

	return (
		<>
			{name && (
				<Container>
					<Card>
						<CardItem header bordered>
							<Image source={bookCover} style={styles.cardImg} />
							<View style={styles.bookDescription}>
								<Text style={styles.bookTitle}>{name}</Text>
								<Text note>{author}</Text>
								<Text note>Status: {status}</Text>
							</View>
							<View style={styles.editQuoteContainer}>
								<Button
									light
									block
									transparent
									style={styles.editBookButton}
									onPress={() =>
										navigation.navigate("Edit book details", {
											id,
											initialBookValues: { name, author, cover, status },
										})
									}
								>
									<Icon type="Entypo" name="edit" style={styles.editIcon} />
								</Button>
							</View>
						</CardItem>
					</Card>
					<SwipeListView
						rightOpenValue={-75}
						disableRightSwipe={true}
						tension={-2}
						friction={20}
						keyExtractor={(quote) => quote.id}
						data={quotes}
						renderItem={({ item }) => (
							<ListItem style={styles.rowFront}>
								<QuoteItem quote={item} />
							</ListItem>
						)}
						renderHiddenItem={({ item }) => (
							<View style={styles.rowBack}>
								<TouchableOpacity
									style={styles.hiddenButton}
									onPress={() =>
										navigation.navigate("Add/Edit Quote", {
											bookId: id,
											quoteId: item.id,
											quote: item.quote,
											categories: item.categories,
											isEdit: true,
										})
									}
								>
									<Icon type="Entypo" name="edit" style={styles.editIcon} />
								</TouchableOpacity>
							</View>
						)}
					/>
					<Fab
						button
						position="bottomRight"
						style={styles.fabButton}
						onPress={() => navigateToAddQuote()}
					>
						<Icon name="add" />
					</Fab>
				</Container>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	bookDescription: {
		flex: 2,
	},
	bookTitle: {
		color: Colors.blackChocolate,
		fontSize: 18,
	},
	cardImg: {
		flex: 1,
		height: 70,
		marginRight: 10,
		maxWidth: 50,
	},
	editBookButton: {
		margin: -5,
		minHeight: 40,
	},
	editIcon: {
		color: Colors.blackChocolate,
		fontSize: 22,
	},
	editQuoteContainer: {
		flex: 0.4,
	},
	fabButton: {
		backgroundColor: Colors.success,
		margin: 10,
	},
	hiddenButton: {
		alignItems: "center",
		backgroundColor: Colors.lightOrange,
		flex: 1,
		justifyContent: "center",
		paddingLeft: 25,
		width: 100,
	},
	rowBack: {
		alignItems: "center",
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	rowFront: {
		backgroundColor: "white",
		justifyContent: "center",
	},
});

BookDetailsScreen.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
	}),
	route: PropTypes.object,
	deleteBook: PropTypes.func,
	updateBookDetails: PropTypes.func,
	books: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => ({
	books: state.books,
});

export default connect(mapStateToProps)(BookDetailsScreen);
