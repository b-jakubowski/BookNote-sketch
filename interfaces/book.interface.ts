export interface Book {
	id: string | number;
	name: string;
	author: string;
	cover: string;
	status: Status;
	quotes: Quote[];
}

export enum Status {
	TO_READ = "To read",
	READING = "Reading",
	READ = "Read",
}

export interface Quote {
	id: string;
	categories: string[];
	quote: string;
}
