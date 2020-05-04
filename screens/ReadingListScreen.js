import React, {useState} from "react";
import {BooksPropTypes} from "../constants/PropTypes";
import {connect} from "react-redux";
import {Container, ListItem, Text, Body, Tabs, Tab} from "native-base";
import Colors from "../constants/Colors";
import {StyleSheet} from "react-native";

function ReadingListScreen({books}) {
	const [activePage, setActivePage] = useState("To read");
	const statusCount = {
		"To read": 0,
		Reading: 0,
		Read: 0,
	};

	books.forEach((book) => statusCount[book.status]++);

	const ActivePageBookList = ({status}) => (
		<>
			<Text style={styles.amountText}>Amount: {statusCount[status]}</Text>
			{books.map((book) => {
				if (activePage === book.status) {
					return (
						<ListItem key={book.id}>
							<Body>
								<Text>{book.name}</Text>
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
				onChangeTab={(active) => setActivePage(active.ref.props.heading)}
				tabBarUnderlineStyle={styles.tabUnderline}
			>
				<Tab
					heading="To read"
					activeTabStyle={styles.activeTab}
					activeTextStyle={styles.activeText}
					tabStyle={styles.tab}
				>
					<ActivePageBookList status="To read" />
				</Tab>
				<Tab
					heading="Reading"
					activeTabStyle={styles.activeTab}
					tabStyle={styles.tab}
					activeTextStyle={styles.activeText}
				>
					<ActivePageBookList status="Reading" />
				</Tab>
				<Tab
					heading="Read"
					activeTabStyle={styles.activeTab}
					tabStyle={styles.tab}
					activeTextStyle={styles.activeText}
				>
					<ActivePageBookList status="Read" />
				</Tab>
			</Tabs>
		</Container>
	);
}

ReadingListScreen.propTypes = BooksPropTypes;

const styles = StyleSheet.create({
	activeTab: {
		backgroundColor: Colors.lightGrey,
	},
	activeText: {
		color: Colors.darkOrange,
	},
	amountText: {
		color: "grey",
		marginLeft: 25,
		paddingVertical: 10,
	},
	tab: {
		backgroundColor: "white",
	},
	tabUnderline: {
		backgroundColor: Colors.darkOrange,
	},
});

const mapStateToProps = (state) => {
	return {
		books: state.books,
	};
};

export default connect(mapStateToProps)(ReadingListScreen);
