import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { Text, Fab, Icon, Item, Button, Input, Content } from "native-base";

import BookListItem from "./BookListItem";
import { firestore } from "../constants/Firebase";
import { addBook } from "../store/actions/book";
import Colors from "../constants/Colors";
import { Book } from "../interfaces/book.interface";
import { Store } from "../store/store";
import { useNavigation } from "@react-navigation/native";

interface Props {
	uid: string;
	books: Book[];
	addBook: (book: Book) => void;
}

const BookList: React.FC<Props> = ({ uid, books, addBook, ...props }) => {
	const [loading, setLoading] = useState(false);
	const [searchVisible, setSearchVisible] = useState(false);
	const [searchVal, setSearchVal] = useState("");
	const [fabActive, setFabActive] = useState(false);
	const navigation = useNavigation();

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
			book.title.toLowerCase().includes(searchVal.toLowerCase())
		);

	const booksSource = searchVal ? filteredBooks() : books;

	const handleAddButtonPress = () => {
		setFabActive(false);
		navigation.navigate("Add book");
	};

	const handleSearchButtonPress = () => {
		setFabActive(false);
		setSearchVisible(true);
	};

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

			<Content contentContainerStyle={styles.contentContainer}>
				{loading ? (
					<ActivityIndicator size="large" />
				) : books.length ? (
					booksSource.map((book) => <BookListItem key={book.id} {...book} />)
				) : (
					<Text>No books found</Text>
				)}
			</Content>

			<Fab
				active={fabActive}
				direction="up"
				style={styles.fabButton}
				position="bottomRight"
				onPress={() => setFabActive((val) => !val)}
			>
				<Icon type="Feather" name="more-horizontal" />
				{fabActive && (
					<Button
						style={styles.searchFabButton}
						onPress={() => handleSearchButtonPress()}
					>
						<Icon type="AntDesign" name="search1" />
					</Button>
				)}
				{fabActive && (
					<Button
						style={styles.addBookFabButton}
						onPress={() => handleAddButtonPress()}
					>
						<Icon type="Feather" name="plus" />
					</Button>
				)}
			</Fab>
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
		backgroundColor: Colors.blackChocolate,
	},
	searchBar: {
		marginRight: 30,
		marginLeft: 30,
		marginBottom: 5,
	},
	searchFabButton: {
		backgroundColor: Colors.tintColor,
	},
	addBookFabButton: {
		backgroundColor: Colors.success,
	},
});

const mapStateToProps = (state: Store) => ({
	books: state.books,
	uid: state.auth.uid,
});

export default connect(mapStateToProps, { addBook })(BookList);
