export interface Book extends BookDetails {
	id: string | number;
	quotes: Quote[];
}

export interface BookDetails {
	name: string;
	author: string;
	cover: string;
	status: Status;
}

export enum Status {
	TO_READ = "To read",
	READING = "Reading",
	READ = "Read",
}

export interface Quote {
	id?: string;
	bookId?: string | number;
	categories: string[];
	quote: string;
}
