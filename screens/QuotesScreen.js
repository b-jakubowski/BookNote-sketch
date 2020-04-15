import * as React from "react";
import Quote from "../components/Quote";
import {BooksPropTypes} from "../constants/PropTypes";
import {connect} from "react-redux";
import {Container, Content} from "native-base";

const QuotesScreen = ({books}) => {
	return (
		<Container>
			<Content>
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
			</Content>
		</Container>
	);
};

QuotesScreen.propTypes = BooksPropTypes;

const mapStateToProps = (state) => {
	return {
		books: state.quoteReducer.books,
	};
};

export default connect(mapStateToProps)(QuotesScreen);
