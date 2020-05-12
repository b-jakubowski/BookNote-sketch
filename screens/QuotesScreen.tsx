import React from "react";
import QuoteItem from "../components/QuoteItem";
import { connect } from "react-redux";
import { Container, Content, List, ListItem } from "native-base";
import { Book, Quote } from "../interfaces/book.interface";

type Props = {
	books: Book[];
};

const QuotesScreen: React.FC<Props> = ({ books }) => {
	return (
		<Container>
			<Content>
				<List>
					{books.map((book) =>
						book.quotes.map((quote: Quote) => (
							<ListItem key={quote.id}>
								<QuoteItem
									quote={quote}
									author={book.author}
									title={book.name}
								/>
							</ListItem>
						))
					)}
				</List>
			</Content>
		</Container>
	);
};

const mapStateToProps = ({ books }: Props) => ({ books });

export default connect(mapStateToProps)(QuotesScreen);
