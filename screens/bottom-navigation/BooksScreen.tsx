import React, { useState, useEffect } from "react";
import { Fab, Icon, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { addBooks } from "../../store/actions/book";
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
import { showWarnToast } from "../../helpers/Toast";

const FabTheme = styled(Fab)`
	background-color: ${fabExtendedColor};
`;
const IconTheme = styled(Icon)`
	color: ${iconColor};
`;

const BooksScreen: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [searchVisible, setSearchVisible] = useState(false);
	const [searchVal, setSearchVal] = useState("");
	const [fabActive, setFabActive] = useState(false);
	const books = useSelector((state: Store) => state.books);
	const uid = useSelector((state: Store) => state.auth.uid);
	const dispatch = useDispatch();
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
					const booksDocs: Book[] = [];
					booksStore.docs.forEach(
						(book) => booksDocs.push({ id: book.id, ...book.data() } as Book)
						// TODO: Map quotes and add to store here
					);

					dispatch(addBooks(booksDocs));
				}
			})
			.catch((e) => showWarnToast(e))
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

export default BooksScreen;
