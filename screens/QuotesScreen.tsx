import React, { useEffect } from "react";
import QuoteItem from "../components/QuoteItem";
import { connect } from "react-redux";
import { Container, Content, List, ListItem, View, Icon } from "native-base";
import { Book, Quote } from "../interfaces/book.interface";
import { SwipeListView } from "react-native-swipe-list-view";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";

type Props = {
	books: Book[];
	navigation: StackNavigationHelpers;
};

const QuotesScreen: React.FC<Props> = ({ books, navigation }) => {
	const quotes: Quote[] = [];

	books.forEach((book) => {
		book.quotes.forEach((quote: Quote) => {
			quotes.push({ bookId: book.id, ...quote });
		});
	});

	return (
		<Container>
			<List>
				<SwipeListView
					rightOpenValue={-75}
					disableRightSwipe={true}
					tension={-2}
					friction={20}
					keyExtractor={(quote, index) => `${quote.id}-${index}`}
					data={quotes}
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
		</Container>
	);
};

const styles = StyleSheet.create({
	editIcon: {
		color: Colors.blackChocolate,
		fontSize: 22,
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
});

const mapStateToProps = ({ books }: Props) => ({ books });

export default connect(mapStateToProps)(QuotesScreen);
