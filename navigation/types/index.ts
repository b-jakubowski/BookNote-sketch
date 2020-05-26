import { BookDetails } from "../../interfaces/book.interface";
import { User } from "../../interfaces/user.interface";

export type BottomStackParamList = {
	"Daily Quote": undefined;
	"Reading list": undefined;
	Quotes: undefined;
	Books: undefined;
};

export type StackParamList = {
	Books: undefined;
	Camera: {
		isEdit: boolean;
		initialBookValues: BookDetails;
		id: string | number;
	};
	"Book details": { id: string };
	"Add/Edit Quote": {
		bookId: string;
		quoteId: string;
		quote: string;
		categories: string[];
		isEdit: boolean;
	};
	"Edit book details": {
		id: string;
		initialBookValues: BookDetails;
	};
	"User details": {
		user: User;
	};
	"Add book": {
		uri: string;
	};
};
