import React, { useState } from "react";
import { connect } from "react-redux";
import { Container, ListItem, Text, Body, Tabs, Tab } from "native-base";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";

import Colors from "../../constants/Colors";
import { StyleSheet } from "react-native";
import { Book, Status } from "../../interfaces/book.interface";

type Props = {
	books: Book[];
	navigation: StackNavigationHelpers;
};

const ReadingListScreen: React.FC<Props> = ({ books, navigation }) => {
	const [activePage, setActivePage] = useState<Status>(Status.TO_READ);
	const statusCount = {
		[Status.TO_READ]: 0,
		[Status.READING]: 0,
		[Status.READ]: 0,
		[Status.NONE]: 0,
	};

	const navigateToBookDetails = (
		id: string | number,
		title: string,
		author: string,
		cover: string,
		status: string
	) => {
		navigation.navigate("Edit book details", {
			id,
			initialBookValues: { title, author, cover, status },
		});
	};

	books.forEach((book) => statusCount[book.status]++);

	const ActivePageBookList: React.FC<{ status: Status }> = ({ status }) => (
		<>
			<Text style={styles.amountText}>Amount: {statusCount[status]}</Text>
			{books.map((book) => {
				if (activePage === book.status) {
					return (
						<ListItem
							key={book.id}
							onLongPress={() =>
								navigateToBookDetails(
									book.id,
									book.title,
									book.author,
									book.cover,
									book.status
								)
							}
						>
							<Body>
								<Text>{book.title}</Text>
								<Text note>{book.author}</Text>
							</Body>
						</ListItem>
					);
				}
			})}
		</>
	);

	return (
		<Container>
			<Tabs
				onChangeTab={(active: any) => setActivePage(active.ref.props.heading)}
				tabBarUnderlineStyle={styles.tabUnderline}
			>
				<Tab
					heading={Status.TO_READ}
					activeTabStyle={styles.activeTab}
					activeTextStyle={styles.activeText}
					tabStyle={styles.tab}
				>
					<ActivePageBookList status={Status.TO_READ} />
				</Tab>
				<Tab
					heading={Status.READING}
					activeTabStyle={styles.activeTab}
					tabStyle={styles.tab}
					activeTextStyle={styles.activeText}
				>
					<ActivePageBookList status={Status.READING} />
				</Tab>
				<Tab
					heading={Status.READ}
					activeTabStyle={styles.activeTab}
					tabStyle={styles.tab}
					activeTextStyle={styles.activeText}
				>
					<ActivePageBookList status={Status.READ} />
				</Tab>
			</Tabs>
		</Container>
	);
};

const styles = StyleSheet.create({
	activeTab: {
		backgroundColor: Colors.lightOrange,
	},
	activeText: {
		color: Colors.blackChocolate,
		fontWeight: "normal",
	},
	amountText: {
		color: Colors.brownOrange,
		marginLeft: 25,
		paddingVertical: 10,
	},
	tab: {
		backgroundColor: "white",
	},
	tabUnderline: {
		backgroundColor: Colors.accentOrange,
	},
});

const mapStateToProps = ({ books }: Props) => ({ books });

export default connect(mapStateToProps)(ReadingListScreen);
