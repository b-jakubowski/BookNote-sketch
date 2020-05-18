export interface Book extends BookDetails {
	id: string | number;
	quotes: Quote[];
	createdAt: Date;
	userId: string;
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
