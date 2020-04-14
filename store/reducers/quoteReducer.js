import {
	ADD_BOOK,
	DELETE_BOOK,
	ADD_QUOTE_TO_BOOK,
} from "../../constants/ActionTypes";
import {booksMock} from "../../assets/mocks/books";

export const initialState = {
	books: booksMock,
};

const quoteReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_BOOK:
			return {
				...state,
				books: [...state.books, action.payload],
			};
		case ADD_QUOTE_TO_BOOK:
			return {
				...state,
				books: state.books.map((book) => {
					if (book.id === action.bookId) {
						return {
							...book,
							quotes: [...book.quotes, action.payload],
						};
					}

					return book;
				}),
			};
		case DELETE_BOOK:
			return {
				...state,
				books: [state.books.filter((item) => item.id !== action.id)],
			};
		default:
			return state;
	}
};

export default quoteReducer;
