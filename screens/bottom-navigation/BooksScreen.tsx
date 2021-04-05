import React, { useState, useEffect } from "react";
import { Fab, Icon, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import styled from "styled-components";

import { addBook } from "../../store/actions/book";
import BookList from "../../components/BookList/BookList";
import Search from "../../components/Search";
import firestore from "@react-native-firebase/firestore";
import { Store } from "../../store/store";
import { Book } from "../../interfaces/book.interface";
import {
	fabExtendedColor,
	iconColor,
	gray,
	green,
	orange,
} from "../../constants/Theme";
import { useTheme } from "../../context/ThemeContext";

interface Props {
	uid: string;
	books: Book[];
	addBook: (book: Book) => void;
}

const FabTheme = styled(Fab)`
	background-color: ${fabExtendedColor};
`;
const IconTheme = styled(Icon)`
	color: ${iconColor};
`;

const BooksScreen: React.FC<Props> = ({ uid, books, addBook }) => {
	const [loading, setLoading] = useState(false);
	const [searchVisible, setSearchVisible] = useState(false);
	const [searchVal, setSearchVal] = useState("");
	const [fabActive, setFabActive] = useState(false);
	const navigation = useNavigation();
	const theme = useTheme();

	const fabIconColor = theme.mode === "dark" ? gray[900] : gray[100];

	useEffect(() => {
		setLoading(true);

		firestore()
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
		<>
			{searchVisible && (
				<Search
					onChangeText={(val: string) => setSearchVal(val)}
					onPress={() => handleCloseSearch()}
				/>
			)}

			<BookList books={booksSource} loading={loading} />

			<FabTheme
				active={fabActive}
				direction="up"
				position="bottomRight"
				onPress={() => setFabActive((val) => !val)}
			>
				<IconTheme
					style={{ color: fabIconColor }}
					type="Feather"
					name="more-horizontal"
				/>
				{fabActive && (
					<Button
						style={{ backgroundColor: orange[500] }}
						onPress={() => handleSearchButtonPress()}
					>
						<Icon type="AntDesign" name="search1" />
					</Button>
				)}
				{fabActive && (
					<Button
						style={{ backgroundColor: green[700] }}
						onPress={() => handleAddButtonPress()}
					>
						<Icon type="Feather" name="plus" />
					</Button>
				)}
			</FabTheme>
		</>
	);
};

const mapStateToProps = (state: Store) => ({
	books: state.books,
	uid: state.auth.uid,
});

export default connect(mapStateToProps, { addBook })(BooksScreen);
