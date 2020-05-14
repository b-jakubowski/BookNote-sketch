import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import BookListItem from "./BookListItem";
import { firestore } from "../constants/Firebase";
import { addBook } from "../store/actions/book";
import { Text, Fab, Icon, Item, Button, Input } from "native-base";
import Colors from "../constants/Colors";
import { Book } from "../interfaces/book.interface";
import { Store } from "../store/store";

interface Props {
	uid: string;
	books: Book[];
	addBook: (book: Book) => void;
}

const BookList: React.FC<Props> = ({ uid, books, addBook }) => {
	const [loading, setLoading] = useState(false);
	const [searchVisible, setSearchVisible] = useState(false);
	const [searchVal, setSearchVal] = useState("");

	useEffect(() => {
		setLoading(true);

		firestore
			.collection("books")
			.where("userId", "==", uid)
			.get()
			.then((booksStore) => {
				if (!books.length) {
					booksStore.docs.forEach((book) =>
						addBook({ id: book.id, ...book.data() } as Book)
					);
				}
			})
			.catch()
			.finally(() => setLoading(false));
	}, []);

	const filteredBooks = (): Book[] =>
		books.filter((book) =>
			book.name.toLowerCase().includes(searchVal.toLowerCase())
		);

	const booksSource = searchVal ? filteredBooks() : books;

	return (
		<>
			{searchVisible && (
				<Item style={styles.searchBar}>
					<Icon type="Ionicons" name="ios-search" />
					<Input
						placeholder="Search"
						autoCorrect={false}
						onChangeText={(val) => setSearchVal(val)}
					/>
					<Button
						transparent
						small
						onPress={() => {
							setSearchVal("");
							setSearchVisible(false);
						}}
					>
						<Icon
							type="Ionicons"
							name="md-close"
							style={{ color: Colors.darkOrange }}
						/>
					</Button>
				</Item>
			)}
			<ScrollView contentContainerStyle={styles.contentContainer}>
				{loading ? (
					<ActivityIndicator size="large" />
				) : books.length ? (
					booksSource.map((book) => <BookListItem key={book.id} {...book} />)
				) : (
					<Text>No books found</Text>
				)}
			</ScrollView>
			{!searchVisible && (
				<Fab
					position="bottomRight"
					style={styles.fabButton}
					onPress={() => {
						setSearchVisible(true);
					}}
				>
					<Icon type="FontAwesome" name="search" />
				</Fab>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	contentContainer: {
		alignItems: "center",
		paddingVertical: 15,
	},
	fabButton: {
		zIndex: 1000,
		backgroundColor: Colors.greyTransparent,
	},
	searchBar: {
		marginRight: 30,
		marginLeft: 30,
		marginBottom: 5,
	},
});

const mapStateToProps = (state: Store) => ({
	books: state.books,
	uid: state.auth.uid,
});

export default connect(mapStateToProps, { addBook })(BookList);
