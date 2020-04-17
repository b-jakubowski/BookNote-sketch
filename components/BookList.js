import * as React from "react";
import {ScrollView, StyleSheet} from "react-native";
import {connect} from "react-redux";
import BookListItem from "./BookListItem";
import {BooksPropTypes} from "../constants/PropTypes";

const BookList = ({books}) => {
	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
		>
			{books.map((book) => (
				<BookListItem key={book.id} {...book} />
			))}
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
});

export default connect(mapStateToProps)(BookList);
