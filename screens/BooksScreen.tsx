import React from "react";
import { Container } from "native-base";
import BookList from "../components/BookList";

const BooksScreen: React.FC = () => (
	<Container>
		<BookList />
	</Container>
);

export default BooksScreen;
