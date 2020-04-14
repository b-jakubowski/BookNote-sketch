import {
	ADD_BOOK,
	DELETE_QUOTE,
	ADD_QUOTE_TO_BOOK,
} from "../../constants/ActionTypes";
import {booksMock} from "../../assets/mocks/books";

export const initialState = {
	quotes: booksMock,
};

const quoteReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_BOOK:
			return {
				...state,
				books: [...state.books, action.payload],
			};
		case ADD_QUOTE_TO_BOOK:
			console.log(state.quotes.filter((item) => item.id === action.bookId));
			return {
				...state,
				books: [
					...state.books,
					state.books
						.filter((item) => item.id === action.bookId)
						.quotes.concat([action.payload]),
				],
			};
		case DELETE_QUOTE:
			return {
				...state,
				books: [state.books.filter((item) => item.id !== action.id)],
			};
		default:
			return state;
	}
};

export default quoteReducer;
