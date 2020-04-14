import * as React from "react";
import {ScrollView, StyleSheet} from "react-native";
import Quote from "../components/Quote";
import {BooksPropTypes} from "../constants/PropTypes";
import {connect} from "react-redux";

const QuotesScreen = ({books}) => {
	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
		>
			{books.map((book) =>
				book.quotes.map((quote) => (
					<Quote
						key={quote.id}
						quote={quote}
						author={book.author}
						title={book.name}
					/>
				))
			)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fafafa",
		flex: 1,
	},
	contentContainer: {
		paddingTop: 15,
	},
});

QuotesScreen.propTypes = BooksPropTypes;

const mapStateToProps = (state) => {
	return {
		books: state.quoteReducer.books,
	};
};

export default connect(mapStateToProps)(QuotesScreen);
