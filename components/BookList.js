import * as React from "react";
import {ScrollView, StyleSheet} from "react-native";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import BookListItem from "./BookListItem";

export const BookList = ({quotes}) => {
	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
		>
			{quotes.map((book) => (
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

BookList.propTypes = {
	quotes: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string,
			author: PropTypes.string,
			cover: PropTypes.string,
			startedReading: PropTypes.number,
			endedReading: PropTypes.number,
			quotes: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.string,
					categories: PropTypes.arrayOf(PropTypes.string),
					quote: PropTypes.string,
				})
			),
		})
	),
};

const mapStateToProps = (state) => {
	return {
		quotes: state.quoteReducer.quotes,
	};
};

export default connect(mapStateToProps)(BookList);
