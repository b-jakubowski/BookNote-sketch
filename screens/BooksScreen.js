import * as React from "react";
import BookList from "../components/BookList";
import {Container} from "native-base";

export default function BooksScreen() {
	return (
		<Container>
			<BookList />
		</Container>
	);
}
