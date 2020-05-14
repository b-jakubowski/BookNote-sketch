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

type Props = {
	books: Book[];
	navigation: StackNavigationHelpers;
};

const QuotesScreen: React.FC<Props> = ({ books, navigation }) => {
	const [searchVisible, setSearchVisible] = useState(false);
	const [searchVal, setSearchVal] = useState("");
	const quotes: Quote[] = [];

	books.forEach((book) => {
		book.quotes.forEach((quote: Quote) => {
			quotes.push({ bookId: book.id, ...quote });
		});
	});

	const filteredQuotes = () =>
		quotes.filter((quote) =>
			quote.quote.toLowerCase().includes(searchVal.toLowerCase())
		);

	return (
		<Container>
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
			<List>
				<SwipeListView
					rightOpenValue={-75}
					disableRightSwipe={true}
					tension={-2}
					friction={20}
					keyExtractor={(quote, index) => `${quote.id}-${index}`}
					data={searchVal ? filteredQuotes() : quotes}
					renderItem={({ item }) => (
						<ListItem style={styles.rowFront}>
							<QuoteItem quote={item} />
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
		</Container>
	);
};

const styles = StyleSheet.create({
	editIcon: {
		color: Colors.blackChocolate,
		fontSize: 22,
	},
	fabButton: {
		zIndex: 1000,
		backgroundColor: Colors.greyTransparent,
	},
	hiddenButton: {
		alignItems: "center",
		backgroundColor: Colors.lightOrange,
		flex: 1,
		justifyContent: "center",
		paddingLeft: 25,
		width: 100,
	},
	rowBack: {
		alignItems: "center",
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	rowFront: {
		backgroundColor: "white",
		justifyContent: "center",
	},
	searchBar: {
		marginRight: 30,
		marginLeft: 20,
		marginBottom: 5,
	},
});

const mapStateToProps = ({ books }: Props) => ({ books });

export default connect(mapStateToProps)(QuotesScreen);
