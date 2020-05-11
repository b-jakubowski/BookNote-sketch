import * as React from "react";
import { Container } from "native-base";
import BookList from "../components/BookList";

export default function BooksScreen() {
	return (
		<Container>
			<BookList />
		</Container>
	);
}
