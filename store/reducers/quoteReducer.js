import {
	ADD_BOOK,
	DELETE_BOOK,
	ADD_QUOTE_TO_BOOK,
	CLEAR_BOOKS,
	UPDATE_BOOK_DETAILS,
	UPDATE_QUOTE,
	DELETE_QUOTE,
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

		case CLEAR_BOOKS:
			return {
				...state,
				books: [],
			};

		case UPDATE_BOOK_DETAILS:
			return {
				...state,
				books: [
					...state.books.filter((item) => item.id !== action.bookId),
					{
						...state.books.filter((item) => item.id === action.bookId)[0],
						name: action.payload.name,
						author: action.payload.author,
						cover: action.payload.cover,
						status: action.payload.status,
					},
				],
			};

		case DELETE_BOOK:
			return {
				...state,
				books: state.books.filter((item) => item.id !== action.bookId),
			};

		case UPDATE_QUOTE: {
			const bookRef = state.books.filter(
				(book) => book.id === action.bookId
			)[0];
			const quoteIndex = bookRef.quotes.findIndex(
				(quote) => quote.id === action.quoteId
			);
			const quoteUpdated = {
				...bookRef.quotes[quoteIndex],
				categories: action.payload.categories,
				quote: action.payload.quote,
			};

			bookRef.quotes.splice(quoteIndex, 1);

			return {
				...state,
				books: [
					...state.books.filter((item) => item.id !== action.bookId),
					{
						...bookRef,
						quotes: [...bookRef.quotes, quoteUpdated],
					},
				],
			};
		}

		case DELETE_QUOTE: {
			const bookRef = state.books.filter(
				(book) => book.id === action.bookId
			)[0];

			return {
				...state,
				books: [
					...state.books.filter((item) => item.id !== action.bookId),
					{
						...bookRef,
						quotes: [
							...bookRef.quotes.filter((quote) => quote.id !== action.quoteId),
						],
					},
				],
			};
		}

		default:
			return state;
	}
};

export default quoteReducer;
