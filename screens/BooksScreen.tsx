import React from "react";
import BookList from "../components/BookList";
import ContainerBackground from "../components/ContainerBackground";

const BooksScreen: React.FC = () => (
	<ContainerBackground>
		<BookList />
	</ContainerBackground>
);

export default BooksScreen;
