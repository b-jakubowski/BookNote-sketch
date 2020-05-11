import {
	addBook,
	addQuoteToBook,
	updateBookDetails,
	deleteBook,
	clearBooks,
	updateQuote,
	deleteQuote,
} from "../book";
import { categoriesMock } from "../../../assets/mocks/categories";
import { status } from "../../../assets/mocks/books";

const mockBook = {
	id: "1",
	name: "The Great Gatsby",
	author: "F. Scott Fitzgerald",
	cover:
		"https://upload.wikimedia.org/wikipedia/commons/a/a0/The_Great_Gatsby_cover_1925_%281%29.jpg",
	status: status.READ,
	quotes: [
		{
			id: "1",
			categories: [categoriesMock[5]],
			quote:
				"And I like large parties. They’re so intimate. At small parties there isn’t any privacy.",
		},
	],
	startedReading: null,
	endedReading: null,
};

const mockQuote = {
	id: "1",
	categories: [categoriesMock[4], categoriesMock[5]],
	quote: "There is some good in this world, and it’s worth fighting for",
};

const mockBookDetails = {
	name: "The Great Gatsby 2: Return of the Great",
	author: "F. Scott Fitzgerald",
	cover: "test cover",
	status: status.TO_READ,
};

describe("quote actions", () => {
	it("addBook should create ADD_BOOK action", () => {
		expect(addBook(mockBook)).toEqual({
			type: "ADD_BOOK",
			payload: mockBook,
		});
	});

	it("addBookToBook should create ADD_QUOTE_TO_BOOK action", () => {
		expect(addQuoteToBook(mockQuote, "1")).toEqual({
			type: "ADD_QUOTE_TO_BOOK",
			bookId: "1",
			payload: mockQuote,
		});
	});

	it("deleteBook should create DELETE_BOOK action", () => {
		expect(deleteBook("1")).toEqual({
			type: "DELETE_BOOK",
			bookId: "1",
		});
	});

	it("updateBookDetails should create UPDATE_BOOK_DETAILS action", () => {
		expect(updateBookDetails("1", mockBookDetails)).toEqual({
			type: "UPDATE_BOOK_DETAILS",
			bookId: "1",
			payload: mockBookDetails,
		});
	});

	it("clearBooks should create CLEAR_BOOKS action", () => {
		expect(clearBooks()).toEqual({
			type: "CLEAR_BOOKS",
		});
	});

	it("updateQuote should create UPDATE_QUOTE action", () => {
		expect(updateQuote("1", "123", mockQuote)).toEqual({
			type: "UPDATE_QUOTE",
			bookId: "1",
			quoteId: "123",
			payload: mockQuote,
		});
	});

	it("deleteQuote should create DELETE_QUOTE action", () => {
		expect(deleteQuote("1", "123")).toEqual({
			type: "DELETE_QUOTE",
			bookId: "1",
			quoteId: "123",
		});
	});
});
