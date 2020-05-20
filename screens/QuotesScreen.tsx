import React, { useState } from "react";
import { connect } from "react-redux";
import {
	Container,
	List,
	ListItem,
	View,
	Icon,
	Item,
	Input,
	Button,
	Fab,
} from "native-base";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { SwipeListView } from "react-native-swipe-list-view";
import { TouchableOpacity } from "react-native-gesture-handler";

import QuoteItem from "../components/QuoteItem";
import { Book, Quote } from "../interfaces/book.interface";
import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import ContainerBackground from "../components/ContainerBackground";

type Props = {
	books: Book[];
	navigation: StackNavigationHelpers;
};

interface QuoteListItem extends Quote {
	bookAuthor: string;
	bookTitle: string;
}

const QuotesScreen: React.FC<Props> = ({ books, navigation }) => {
	const [searchVisible, setSearchVisible] = useState(false);
	const [searchVal, setSearchVal] = useState("");
	const quotes: QuoteListItem[] = [];

	books.forEach((book) => {
		book.quotes.forEach((quote: Quote) => {
			quotes.push({
				bookId: book.id,
				bookAuthor: book.author,
				bookTitle: book.title,
				...quote,
			});
		});
	});

	const filteredQuotes = () =>
		quotes.filter((quote) =>
			quote.quote.toLowerCase().includes(searchVal.toLowerCase())
		);

	return (
		<ContainerBackground>
			{searchVisible && (
				<Item style={styles.searchBar}>
					<Icon type="Ionicons" name="ios-search" />
					<Input
						placeholder="Search"
						autoCorrect={false}
						onChangeText={(val) => setSearchVal(val)}
					/>
					<Button
						transparent
						small
						onPress={() => {
							setSearchVisible(false);
							setSearchVal("");
						}}
					>
						<Icon
							type="Ionicons"
							name="md-close"
							style={{ color: Colors.darkOrange }}
						/>
					</Button>
				</Item>
			)}

			<List style={{ flex: 1, margin: 10 }}>
				<SwipeListView
					rightOpenValue={-75}
					disableRightSwipe={true}
					tension={-2}
					friction={20}
					keyExtractor={(quote, index) => `${quote.id}-${index}`}
					data={searchVal ? filteredQuotes() : quotes}
					renderItem={({ item }) => (
						<ListItem style={styles.rowFront} noIndent itemDivider>
							<QuoteItem
								quote={item}
								author={item.bookAuthor}
								title={item.bookTitle}
							/>
						</ListItem>
					)}
					renderHiddenItem={({ item }) => (
						<View style={styles.rowBack}>
							<TouchableOpacity
								style={styles.hiddenButton}
								onPress={() =>
									navigation.navigate("Add/Edit Quote", {
										bookId: item.bookId,
										quoteId: item.id,
										quote: item.quote,
										categories: item.categories,
										isEdit: true,
									})
								}
							>
								<Icon type="Entypo" name="edit" style={styles.editIcon} />
							</TouchableOpacity>
						</View>
					)}
				/>
			</List>

			{!searchVisible && (
				<Fab
					position="bottomRight"
					style={styles.fabButton}
					onPress={() => setSearchVisible(true)}
				>
					<Icon type="FontAwesome" name="search" />
				</Fab>
			)}
		</ContainerBackground>
	);
};

const styles = StyleSheet.create({
	editIcon: {
		color: Colors.blackChocolate,
		fontSize: 22,
	},
	fabButton: {
		zIndex: 1000,
		backgroundColor: Colors.tintColor,
	},
	hiddenButton: {
		alignItems: "center",
		backgroundColor: Colors.lightOrange,
		flex: 1,
		justifyContent: "center",
		paddingLeft: 15,
		width: 100,
	},
	rowBack: {
		alignItems: "center",
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-end",
		backgroundColor: "white",
		marginBottom: 10,
	},
	rowFront: {
		flex: 1,
		backgroundColor: "white",
		justifyContent: "center",
		marginBottom: 10,
	},
	searchBar: {
		marginRight: 30,
		marginLeft: 20,
		marginBottom: 5,
	},
});

const mapStateToProps = ({ books }: Props) => ({ books });

export default connect(mapStateToProps)(QuotesScreen);
