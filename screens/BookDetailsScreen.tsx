import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
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
import { TouchableOpacity } from "react-native-gesture-handler";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";

import QuoteItem from "../components/QuoteItem";
import Colors from "../constants/Colors";
import { StackParamList } from "./HomeScreen";
import { Book } from "../interfaces/book.interface";
import { Store } from "../store/store";

interface Props {
	navigation: StackNavigationHelpers;
	route: RouteProp<StackParamList, "Book details">;
	books: Book[];
}

const BookDetailsScreen: React.FC<Props> = ({ route, books, navigation }) => {
	const { id } = route.params;
	const { cover, title, author, quotes, status } =
		books.filter((book) => book.id === id)[0] || {};

	const navigateToAddQuote = () => {
		navigation.navigate("Add/Edit Quote", { bookId: id });
	};

	const bookCover = cover
		? { uri: cover }
		: require("../assets/images/book-cover-placeholder.jpg");

	return (
		<>
			{title && (
				<Container>
					<Card>
						<CardItem header bordered>
							<Image source={bookCover} style={styles.cardImg} />
							<View style={styles.bookDescription}>
								<Text style={styles.bookTitle}>{title}</Text>
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
											initialBookValues: { title, author, cover, status },
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
};

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

const mapStateToProps = (state: Store): { books: Book[] } => ({
	books: state.books,
});

export default connect(mapStateToProps)(BookDetailsScreen);
