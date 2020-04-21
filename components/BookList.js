import React, {useState, useEffect} from "react";
import {ScrollView, StyleSheet, ActivityIndicator} from "react-native";
import {connect} from "react-redux";
import BookListItem from "./BookListItem";
import {BooksPropTypes} from "../constants/PropTypes";
import {firestore} from "../constants/Firebase";
import {addBook} from "../store/actions/quote";
import {Text} from "native-base";

const BookList = ({uid, books, addBook}) => {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);

		firestore
			.collection("books")
			.where("userId", "==", uid)
			.get()
			.then((books) =>
				books.docs.forEach((book) => addBook({id: book.id, ...book.data()}))
			)
			.catch()
			.finally(() => setLoading(false));
	}, []);

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
		>
			{loading ? (
				<ActivityIndicator size="large" />
			) : books.length ? (
				books.map((book) => <BookListItem key={book.id} {...book} />)
			) : (
				<Text>No books found</Text>
			)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	contentContainer: {
		alignItems: "center",
		paddingVertical: 15,
	},
});

BookList.propTypes = BooksPropTypes;

const mapStateToProps = (state) => ({
	books: state.quoteReducer.books,
	uid: state.authReducer.user.uid,
});

export default connect(mapStateToProps, {addBook})(BookList);
