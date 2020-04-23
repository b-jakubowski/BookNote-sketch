import {
	ADD_BOOK,
	DELETE_BOOK,
	ADD_QUOTE_TO_BOOK,
	CLEAR_BOOKS,
	UPDATE_BOOK_DETAILS,
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
	bookId: id,
});

export const updateBookDetails = (id, details) => ({
	type: UPDATE_BOOK_DETAILS,
	bookId: id,
	payload: details,
});

export const clearBooks = () => ({
	type: CLEAR_BOOKS,
});
