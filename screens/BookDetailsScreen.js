import React, {useState} from "react";
import {StyleSheet, View, Image} from "react-native";
import {SwipeListView} from "react-native-swipe-list-view";
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
import {connect} from "react-redux";
import Quote from "../components/Quote";
import EditBookDetailsModal from "../components/EditBookDetailsModal";
import Colors from "../constants/Colors";
import {TouchableOpacity} from "react-native-gesture-handler";

function BookDetailsScreen({route, books, ...props}) {
	const [modalVisible, setModalVisible] = useState(false);

	const {id} = route.params;
	const {cover, name, author, quotes, status} =
		books.filter((book) => book.id === id)[0] || {};

	const navigateToAddQuote = () => {
		props.navigation.navigate("Add/Edit Quote", {bookId: id});
	};

	const bookCover = cover
		? {uri: cover}
		: require("../assets/images/book-cover-placeholder.jpg");

	return (
		<>
			<EditBookDetailsModal
				id={id}
				initialBookValues={{name, author, cover, status}}
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
			/>
			{name && (
				<Container>
					<Card>
						<CardItem header bordered>
							<Image source={bookCover} style={styles.cardImg} />
							<View style={styles.bookDescription}>
								<Text>{name}</Text>
								<Text note>{author}</Text>
								<Text note>Status: {status}</Text>
							</View>
							<View style={styles.editQuoteContainer}>
								<Button
									small
									block
									light
									style={styles.editBookButton}
									onPress={() => setModalVisible(true)}
								>
									<Text>Edit book</Text>
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
						renderItem={({item}) => (
							<ListItem style={styles.rowFront}>
								<Quote quote={item} />
							</ListItem>
						)}
						renderHiddenItem={({item}) => (
							<View style={styles.rowBack}>
								<TouchableOpacity
									style={styles.hiddenButton}
									onPress={() =>
										props.navigation.navigate("Add/Edit Quote", {
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
	cardImg: {
		flex: 1,
		height: 70,
		marginRight: 10,
		maxWidth: 40,
	},
	editBookButton: {
		margin: -5,
	},
	editIcon: {
		fontSize: 22,
	},
	editQuoteContainer: {
		flex: 1,
	},
	fabButton: {
		backgroundColor: Colors.success,
		margin: 10,
	},
	hiddenButton: {
		alignItems: "center",
		backgroundColor: Colors.lightGrey,
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
