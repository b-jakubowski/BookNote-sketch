import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { Text, Content } from "native-base";

import BookListItem from "./BookListItem";
import { Book } from "../interfaces/book.interface";

interface Props {
	books: Book[];
	loading: boolean;
}

const BookList: React.FC<Props> = ({ books, loading }) => {
	useEffect(() => {}, [books, loading]);

	return (
		<Content>
			{loading ? (
				<ActivityIndicator size="large" />
			) : books.length ? (
				books.map((book) => <BookListItem key={book.id} {...book} />)
			) : (
				<Text>No books found</Text>
			)}
		</Content>
	);
};

export default BookList;
