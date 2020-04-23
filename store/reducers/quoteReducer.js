import {
	ADD_BOOK,
	DELETE_BOOK,
	ADD_QUOTE_TO_BOOK,
	CLEAR_BOOKS,
} from "../../constants/ActionTypes";

const quoteReducer = (state = {books: []}, action) => {
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
		case CLEAR_BOOKS: {
			return {
				...state,
				books: [],
			};
		}
		case DELETE_BOOK:
			return {
				...state,
				books: state.books.filter((item) => item.id != action.payload),
			};
		default:
			return state;
	}
};

export default quoteReducer;
