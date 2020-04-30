import * as React from "react";
import Quote from "../components/Quote";
import {BooksPropTypes} from "../constants/PropTypes";
import {connect} from "react-redux";
import {Container, Content, List, ListItem} from "native-base";

const QuotesScreen = ({books}) => {
	return (
		<Container>
			<Content>
				<List>
					{books.map((book) =>
						book.quotes.map((quote) => (
							<ListItem key={quote.id}>
								<Quote quote={quote} author={book.author} title={book.name} />
							</ListItem>
						))
					)}
				</List>
			</Content>
		</Container>
	);
};

QuotesScreen.propTypes = BooksPropTypes;

const mapStateToProps = (state) => {
	return {
		books: state.books,
	};
};

export default connect(mapStateToProps)(QuotesScreen);
