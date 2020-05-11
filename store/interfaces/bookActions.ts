import {
	ADD_BOOK,
	ADD_QUOTE_TO_BOOK,
	DELETE_BOOK,
	UPDATE_BOOK_DETAILS,
	CLEAR_BOOKS,
	UPDATE_QUOTE,
	DELETE_QUOTE,
} from "../../constants/ActionTypes";
import { Book, Quote } from "../../interfaces/book.interface";

export interface AddBookAction {
	type: typeof ADD_BOOK;
	payload: Book;
}

export interface AddQuoteToBookAction {
	type: typeof ADD_QUOTE_TO_BOOK;
	bookId: string;
	payload: Quote;
}

export interface DeleteBookAction {
	type: typeof DELETE_BOOK;
	bookId: string;
}

export interface UpdateBookDetailsAction {
	type: typeof UPDATE_BOOK_DETAILS;
	bookId: string;
	payload: Book;
}

export interface ClearBooksAction {
	type: typeof CLEAR_BOOKS;
}

export interface UpdateQuoteAction {
	type: typeof UPDATE_QUOTE;
	bookId: string;
	quoteId: string;
	payload: Quote;
}

export interface DeleteQuoteAction {
	type: typeof DELETE_QUOTE;
	bookId: string;
	quoteId: string;
}

export type BookActionTypes =
	| AddBookAction
	| AddQuoteToBookAction
	| DeleteBookAction
	| UpdateBookDetailsAction
	| ClearBooksAction
	| UpdateQuoteAction
	| DeleteQuoteAction;
