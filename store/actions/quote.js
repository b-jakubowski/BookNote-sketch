import {
	ADD_BOOK,
	DELETE_BOOK,
	ADD_QUOTE_TO_BOOK,
	CLEAR_BOOKS,
	UPDATE_BOOK_DETAILS,
	UPDATE_QUOTE,
	DELETE_QUOTE,
} from "../../constants/ActionTypes";

export const addBook = (quote) => ({
	type: ADD_BOOK,
	payload: quote,
});

export const addQuoteToBook = (quote, bookId) => ({
	type: ADD_QUOTE_TO_BOOK,
	bookId,
	payload: quote,
});

export const deleteBook = (bookId) => ({
	type: DELETE_BOOK,
	bookId,
});

export const updateBookDetails = (bookId, details) => ({
	type: UPDATE_BOOK_DETAILS,
	bookId,
	payload: details,
});

export const clearBooks = () => ({
	type: CLEAR_BOOKS,
});

export const updateQuote = (bookId, quoteId, quote) => ({
	type: UPDATE_QUOTE,
	bookId,
	quoteId,
	payload: quote,
});

export const deleteQuote = (bookId, quoteId) => ({
	type: DELETE_QUOTE,
	bookId,
	quoteId,
});
