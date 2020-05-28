import React from "react";
import { View, Image } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { Text, CardItem, Button, Fab, Icon, H3 } from "native-base";
import { connect } from "react-redux";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";

import QuoteItem from "../components/QuoteItem";
import { Book } from "../interfaces/book.interface";
import { Store } from "../store/store";
import { StackParamList } from "../navigation/types";
import {
	QuotesList,
	HiddenListItem,
	HiddenButton,
	EditIcon,
	ListItemTheme,
} from "./bottom-navigation/QuotesScreen";
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

interface Props {
	navigation: StackNavigationHelpers;
	route: RouteProp<StackParamList, "Book details">;
	books: Book[];
}

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

const BookDetailsScreen: React.FC<Props> = ({ route, books, navigation }) => {
	const { id } = route.params;
	const { cover, title, author, quotes, status } =
		books.filter((book) => book.id === id)[0] || {};

	const navigateToAddQuote = () => {
		navigation.navigate("Add/Edit Quote", { bookId: id });
	};

	const bookCover = cover
		? { uri: cover }
		: require("../assets/images/book-cover-placeholder.jpg");

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
					<EditBookButton
						light
						block
						transparent
						onPress={() =>
							navigation.navigate("Edit book details", {
								id,
								initialBookValues: { title, author, cover, status },
							})
						}
					>
						<EditBookIcon type="Entypo" name="edit" />
					</EditBookButton>
				</View>
			</BookDetailsCard>
			{quotes ? (
				<QuotesList>
					<SwipeListView
						rightOpenValue={-75}
						disableRightSwipe={true}
						tension={-2}
						friction={20}
						keyExtractor={(quote) => quote.id}
						data={quotes}
						renderItem={({ item }) => (
							<ListItemTheme noIndent itemDivider>
								<QuoteItem quote={item} />
							</ListItemTheme>
						)}
						renderHiddenItem={({ item }) => (
							<HiddenListItem>
								<HiddenButton
									onPress={() =>
										navigation.navigate("Add/Edit Quote", {
											bookId: id,
											quoteId: item.id,
											quote: item.quote,
											categories: item.categories,
											isEdit: true,
										})
									}
								>
									<EditIcon type="Entypo" name="edit" />
								</HiddenButton>
							</HiddenListItem>
						)}
					/>
				</QuotesList>
			) : (
				<Text style={{ textAlign: "center" }}>No quotes/notes added yet</Text>
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

const mapStateToProps = (state: Store): { books: Book[] } => ({
	books: state.books,
});

export default connect(mapStateToProps)(BookDetailsScreen);
