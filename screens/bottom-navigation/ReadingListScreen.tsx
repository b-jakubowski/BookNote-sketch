import React, { useState } from "react";
import { connect } from "react-redux";
import { ListItem, Text, Body, Tabs, Tab, Content } from "native-base";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";

import { StyleSheet } from "react-native";
import { Book, Status, BookDetails } from "../../interfaces/book.interface";
import styled from "styled-components";
import {
	backgroundColor,
	foregroundColor,
	gray,
	orange,
	brown,
	spacing,
	titleTextColor,
	noteText,
} from "../../constants/Theme";

type Props = {
	books: Book[];
	navigation: StackNavigationHelpers;
};

interface EditBookDetails extends BookDetails {
	id: string | number;
}

const ContentTheme = styled(Content)`
	background-color: ${backgroundColor};
	flex: 1;
`;
const BookListItem = styled(ListItem)`
	background-color: ${foregroundColor};
`;
const BookAmountText = styled(Text)`
	color: ${brown[700]};
	padding: ${spacing.m};
`;
const BookTitle = styled(Text)`
	color: ${titleTextColor};
`;
const BookAuthor = styled(Text)`
	color: ${noteText};
`;

const ReadingListScreen: React.FC<Props> = ({ books, navigation }) => {
	const [activePage, setActivePage] = useState<Status>(Status.TO_READ);
	const statusCount = {
		[Status.TO_READ]: 0,
		[Status.READING]: 0,
		[Status.READ]: 0,
		[Status.NONE]: 0,
	};

	const navigateToEditBook = ({
		id,
		title,
		author,
		cover,
		status,
	}: EditBookDetails) => {
		navigation.navigate("Edit book details", {
			id,
			initialBookValues: { title, author, cover, status },
		});
	};

	books.forEach((book) => statusCount[book.status]++);

	const ActivePageBookList: React.FC<{ status: Status }> = ({ status }) => (
		<ContentTheme>
			<BookAmountText>Amount: {statusCount[status]}</BookAmountText>
			{books.map((book) => {
				if (activePage === book.status) {
					return (
						<BookListItem
							key={book.id}
							noIndent
							onLongPress={() => navigateToEditBook(book)}
						>
							<Body>
								<BookTitle>{book.title}</BookTitle>
								<BookAuthor note>{book.author}</BookAuthor>
							</Body>
						</BookListItem>
					);
				}
			})}
		</ContentTheme>
	);

	return (
		<Tabs
			onChangeTab={(active: any) => setActivePage(active.ref.props.heading)}
			tabBarUnderlineStyle={styles.tabUnderline}
		>
			<Tab
				heading={Status.TO_READ}
				activeTabStyle={styles.activeTab}
				activeTextStyle={styles.activeText}
				textStyle={styles.tabText}
				tabStyle={styles.tab}
			>
				<ActivePageBookList status={Status.TO_READ} />
			</Tab>
			<Tab
				heading={Status.READING}
				activeTabStyle={styles.activeTab}
				activeTextStyle={styles.activeText}
				textStyle={styles.tabText}
				tabStyle={styles.tab}
			>
				<ActivePageBookList status={Status.READING} />
			</Tab>
			<Tab
				heading={Status.READ}
				activeTabStyle={styles.activeTab}
				activeTextStyle={styles.activeText}
				textStyle={styles.tabText}
				tabStyle={styles.tab}
			>
				<ActivePageBookList status={Status.READ} />
			</Tab>
		</Tabs>
	);
};

const styles = StyleSheet.create({
	activeTab: {
		backgroundColor: orange[300],
	},
	activeText: {
		color: gray[800],
	},
	tab: {
		backgroundColor: gray[300],
	},
	tabText: {
		color: gray[700],
	},
	tabUnderline: {
		backgroundColor: orange[700],
	},
});

const mapStateToProps = ({ books }: Props) => ({ books });

export default connect(mapStateToProps)(ReadingListScreen);
