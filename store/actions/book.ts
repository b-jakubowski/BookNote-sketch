import {
	ADD_BOOK,
	DELETE_BOOK,
	ADD_QUOTE_TO_BOOK,
	CLEAR_BOOKS,
	UPDATE_BOOK_DETAILS,
	UPDATE_QUOTE,
	DELETE_QUOTE,
} from "../../constants/ActionTypes";
import { Book, Quote } from "../../interfaces/book.interface";
import {
	AddBookAction,
	AddQuoteToBookAction,
	DeleteBookAction,
	UpdateBookDetailsAction,
	ClearBooksAction,
	UpdateQuoteAction,
	DeleteQuoteAction,
} from "../interfaces/bookActions";

export const addBook = (book: Book): AddBookAction => ({
	type: ADD_BOOK,
	payload: book,
});

export const addQuoteToBook = (
	quote: Quote,
	bookId: string
): AddQuoteToBookAction => ({
	type: ADD_QUOTE_TO_BOOK,
	bookId,
	payload: quote,
});

export const deleteBook = (bookId: string): DeleteBookAction => ({
	type: DELETE_BOOK,
	bookId,
});

export const updateBookDetails = (
	bookId: string,
	details: Book
): UpdateBookDetailsAction => ({
	type: UPDATE_BOOK_DETAILS,
	bookId,
	payload: details,
});

export const clearBooks = (): ClearBooksAction => ({
	type: CLEAR_BOOKS,
});

export const updateQuote = (
	bookId: string,
	quoteId: string,
	quote: Quote
): UpdateQuoteAction => ({
	type: UPDATE_QUOTE,
	bookId,
	quoteId,
	payload: quote,
});

export const deleteQuote = (
	bookId: string,
	quoteId: string
): DeleteQuoteAction => ({
	type: DELETE_QUOTE,
	bookId,
	quoteId,
});
