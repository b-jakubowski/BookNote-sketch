import quoteReducer from "../quoteReducer";
import {status} from "../../../assets/mocks/books";
import {categoriesMock} from "../../../assets/mocks/categories";

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
};

const mockQuote = {
	id: "2",
	categories: [categoriesMock[4], categoriesMock[5]],
	quote: "There is some good in this world, and it’s worth fighting for",
};

const mockBookDetails = {
	name: "The Great Gatsby 2: Return of the Great",
	author: "F. Scott Fitzgerald",
	cover: "test cover",
	status: status.TO_READ,
};

describe("quote reducer", () => {
	it("should handle initial state", () => {
		expect(quoteReducer(undefined, [])).toEqual([]);
	});

	it("should handle ADD_BOOK", () => {
		expect(quoteReducer([], {type: "ADD_BOOK", payload: mockBook})).toEqual([
			mockBook,
		]);
	});

	it("should handle ADD_QUOTE_TO_BOOK", () => {
		expect(
			quoteReducer([mockBook], {
				type: "ADD_QUOTE_TO_BOOK",
				bookId: "1",
				payload: mockQuote,
			})
		).toEqual([
			{
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
					mockQuote,
				],
			},
		]);
	});

	it("should handle DELETE_BOOK", () => {
		expect(
			quoteReducer([mockBook], {type: "DELETE_BOOK", bookId: "1"})
		).toEqual([]);
	});

	it("should handle UPDATE_BOOK_DETAILS", () => {
		expect(
			quoteReducer([mockBook], {
				type: "UPDATE_BOOK_DETAILS",
				bookId: "1",
				payload: mockBookDetails,
			})
		).toEqual([
			{
				id: "1",
				name: "The Great Gatsby 2: Return of the Great",
				author: "F. Scott Fitzgerald",
				cover: "test cover",
				status: status.TO_READ,
				quotes: [
					{
						id: "1",
						categories: [categoriesMock[5]],
						quote:
							"And I like large parties. They’re so intimate. At small parties there isn’t any privacy.",
					},
				],
			},
		]);
	});

	it("should handle CLEAR_BOOKS", () => {
		expect(quoteReducer([mockBook, mockBook], {type: "CLEAR_BOOKS"})).toEqual(
			[]
		);
	});

	it("should handle UPDATE_QUOTE", () => {
		expect(
			quoteReducer([mockBook], {
				type: "UPDATE_QUOTE",
				bookId: "1",
				quoteId: "1",
				payload: {categories: [categoriesMock[1]], quote: "Updated quote"},
			})
		).toEqual([
			{
				id: "1",
				name: "The Great Gatsby",
				author: "F. Scott Fitzgerald",
				cover:
					"https://upload.wikimedia.org/wikipedia/commons/a/a0/The_Great_Gatsby_cover_1925_%281%29.jpg",
				status: status.READ,
				quotes: [
					{
						id: "1",
						categories: [categoriesMock[1]],
						quote: "Updated quote",
					},
				],
			},
		]);
	});

	it("should handle DELETE_QUOTE", () => {
		expect(
			quoteReducer([mockBook], {
				type: "DELETE_QUOTE",
				bookId: "1",
				quoteId: "1",
			})
		).toEqual([
			{
				id: "1",
				name: "The Great Gatsby",
				author: "F. Scott Fitzgerald",
				cover:
					"https://upload.wikimedia.org/wikipedia/commons/a/a0/The_Great_Gatsby_cover_1925_%281%29.jpg",
				status: status.READ,
				quotes: [],
			},
		]);
	});
});
