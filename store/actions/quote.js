import {
	ADD_BOOK,
	DELETE_BOOK,
	ADD_QUOTE_TO_BOOK,
	CLEAR_BOOKS,
} from "../../constants/ActionTypes";

export const addBook = (quote) => ({
	type: ADD_BOOK,
	payload: quote,
});

export const addQuoteToBook = (quote, id) => ({
	type: ADD_QUOTE_TO_BOOK,
	bookId: id,
	payload: quote,
});

export const deleteBook = (id) => ({
	type: DELETE_BOOK,
	payload: id,
});

export const clearBooks = () => ({
	type: CLEAR_BOOKS,
});
