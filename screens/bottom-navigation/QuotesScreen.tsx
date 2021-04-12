import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { List, ListItem, View, Icon, Fab } from "native-base";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";

import QuoteItem from "../../components/QuoteItem";
import { Book, Quote } from "../../interfaces/book.interface";
import Search from "../../components/Search";
import styled from "styled-components";
import {
	foregroundColor,
	spacing,
	brown,
	fontSize,
	orange,
} from "../../constants/Theme";
import { FlatList, TouchableOpacity } from "react-native";

type Props = {
	books: Book[];
	navigation: StackNavigationHelpers;
};

export interface QuoteListItem extends Quote {
	bookAuthor: string;
	bookTitle: string;
}

export const QuotesList = styled(List)`
	flex: 1;
	margin: ${spacing.m};
`;
export const ListItemTheme = styled(ListItem)`
	flex: 1;
	background-color: ${foregroundColor};
	justify-content: center;
	margin-bottom: ${spacing.m};
`;
export const HiddenListItem = styled(View)`
	align-items: center;
	flex: 1;
	flex-direction: row;
	justify-content: flex-end;
	background-color: ${foregroundColor};
	margin-bottom: ${spacing.m};
`;
export const HiddenButton = styled(TouchableOpacity)`
	align-items: center;
	background-color: ${orange[500]};
	flex: 1;
	justify-content: center;
	padding-left: ${spacing.m};
	width: 100px;
`;
export const EditIcon = styled(Icon)`
	color: ${brown[900]};
	font-size: ${fontSize.l};
`;

const QuotesScreen: React.FC<Props> = ({ books, navigation }) => {
	const [searchVisible, setSearchVisible] = useState(false);
	const [searchVal, setSearchVal] = useState("");
	const quotes: QuoteListItem[] = [];

	// TODO: Put all quotes to redux store instead loop here
	books.forEach((book) => {
		if (book.quotes) {
			book.quotes.forEach((quote: Quote) => {
				quotes.push({
					bookId: book.id,
					bookAuthor: book.author,
					bookTitle: book.title,
					...quote,
				});
			});
		}
	});

	const filteredQuotes = () =>
		quotes.filter((quote) =>
			quote.quote.toLowerCase().includes(searchVal.toLowerCase())
		);

	const handleCloseSearch = () => {
		setSearchVisible(false);
		setSearchVal("");
	};

	const onQuotePress = (item: QuoteListItem) =>
		navigation.navigate("Add/Edit Quote", {
			bookId: item.bookId,
			quoteId: item.id,
			quote: item.quote,
			categories: item.categories,
			isEdit: true,
		});

	const renderItem = ({ item }: { item: QuoteListItem }) => (
		<ListItemTheme noIndent itemDivider>
			<QuoteItem
				quote={item}
				author={item.bookAuthor}
				title={item.bookTitle}
				onPress={() => onQuotePress(item)}
			/>
		</ListItemTheme>
	);

	return (
		<>
			{searchVisible && (
				<Search
					onChangeText={(val: string) => setSearchVal(val)}
					onPress={() => handleCloseSearch()}
				/>
			)}

			<QuotesList>
				<FlatList
					data={searchVal ? filteredQuotes() : quotes}
					renderItem={renderItem}
					keyExtractor={(item: QuoteListItem) =>
						`${Math.random()}-${item.bookTitle}`
					}
				/>
			</QuotesList>

			{!searchVisible && (
				<Fab
					position="bottomRight"
					style={{ backgroundColor: orange[800] }}
					onPress={() => setSearchVisible(true)}
				>
					<Icon type="FontAwesome" name="search" />
				</Fab>
			)}
		</>
	);
};

const mapStateToProps = ({ books }: Props) => ({ books });

export default connect(mapStateToProps)(QuotesScreen);
