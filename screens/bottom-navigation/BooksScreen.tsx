import React, { useState, useEffect } from "react";
import { Fab, Icon, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";

import { addBook } from "../../store/actions/book";
import BookList from "../../components/BookList";
import ContainerBackground from "../../components/ContainerBackground";
import Search from "../../components/Search";
import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { firestore } from "../../constants/Firebase";
import { Store } from "../../store/store";
import { Book } from "../../interfaces/book.interface";

interface Props {
	uid: string;
	books: Book[];
	addBook: (book: Book) => void;
}

const BooksScreen: React.FC<Props> = ({ uid, books, addBook }) => {
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

	const handleCloseSearch = () => {
		setSearchVisible(false);
		setSearchVal("");
	};

	return (
		<ContainerBackground>
			{searchVisible && (
				<Search
					onChangeText={(val: string) => setSearchVal(val)}
					onPress={() => handleCloseSearch()}
				/>
			)}

			<BookList books={booksSource} loading={loading} />

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
		</ContainerBackground>
	);
};

const styles = StyleSheet.create({
	fabButton: {
		zIndex: 1000,
		backgroundColor: Colors.blackChocolate,
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

export default connect(mapStateToProps, { addBook })(BooksScreen);
