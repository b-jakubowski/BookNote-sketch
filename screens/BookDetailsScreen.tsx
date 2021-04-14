import React from "react";
import { View, Image, FlatList } from "react-native";
import { Text, CardItem, Button, Fab, Icon, H3 } from "native-base";
import { useSelector } from "react-redux";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";

import QuoteItem from "../components/QuoteItem";
import { Quote } from "../interfaces/book.interface";
import { Store } from "../store/store";
import { StackParamList } from "../navigation/types";
import { QuotesList, ListItemTheme } from "./bottom-navigation/QuotesScreen";
import styled from "styled-components";
import {
	titleTextColor,
	spacing,
	fontSize,
	iconColor,
	green,
	foregroundColor,
	noteText,
} from "../constants/Theme";

const BookDetailsCard = styled(CardItem)`
	background-color: ${foregroundColor};
`;
const BookTitle = styled(H3)`
	color: ${titleTextColor};
`;
const BookDetails = styled(Text)`
	color: ${noteText};
`;
const CardImg = styled(Image)`
	flex: 1;
	height: 70px;
	margin-right: ${spacing.m};
	max-width: 50px;
`;
const EditBookIcon = styled(Icon)`
	color: ${iconColor};
	font-size: ${fontSize.l};
`;
const EditBookButton = styled(Button)`
	margin: -${spacing.s};
	min-height: 40px;
`;

interface Props {
	navigation: StackNavigationHelpers;
	route: RouteProp<StackParamList, "Book details">;
}

const BookDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
	const { id } = route.params;
	const books = useSelector((state: Store) => state.books);
	const { cover, title, author, quotes, status } =
		books.filter((book) => book.id === id)[0] || {};

	const navigateToAddQuote = () => {
		navigation.navigate("Add/Edit Quote", { bookId: id });
	};

	const bookCover = cover
		? { uri: cover }
		: require("../assets/images/book-cover-placeholder.jpg");

	const onQuotePress = (item: Quote) =>
		navigation.navigate("Add/Edit Quote", {
			bookId: id,
			quoteId: item.id,
			quote: item.quote,
			categories: item.categories,
			isEdit: true,
		});

	const onEditBookPress = () =>
		navigation.navigate("Edit book details", {
			id,
			initialBookValues: { title, author, cover, status },
		});

	const renderItem = ({ item }: { item: Quote }) => (
		<ListItemTheme noIndent itemDivider>
			<QuoteItem quote={item} onPress={() => onQuotePress(item)} />
		</ListItemTheme>
	);

	return (
		<>
			<BookDetailsCard header>
				<CardImg source={bookCover} />
				<View style={{ flex: 2 }}>
					<BookTitle>{title}</BookTitle>
					<BookDetails note>{author}</BookDetails>
					<BookDetails note>Status: {status}</BookDetails>
				</View>
				<View style={{ flex: 0.4 }}>
					<EditBookButton light block transparent onPress={onEditBookPress}>
						<EditBookIcon type="Entypo" name="edit" />
					</EditBookButton>
				</View>
			</BookDetailsCard>
			{quotes ? (
				<QuotesList>
					<FlatList
						data={quotes}
						renderItem={renderItem}
						keyExtractor={(item: Quote) => `${Math.random()}-${item.id}`}
					/>
				</QuotesList>
			) : (
				<Text style={{ textAlign: "center" }}>No quotes added yet</Text>
			)}
			<Fab
				position="bottomRight"
				style={{ backgroundColor: green[700] }}
				onPress={() => navigateToAddQuote()}
			>
				<Icon type="Feather" name="plus" />
			</Fab>
		</>
	);
};

export default BookDetailsScreen;
