import React, {useState} from "react";
import Quote from "../components/Quote";
import {BooksPropTypes} from "../constants/PropTypes";
import {connect} from "react-redux";
import {
	Container,
	Content,
	List,
	ListItem,
	Segment,
	Button,
	Text,
	Body,
} from "native-base";
import Colors from "../constants/Colors";

const setSegmentButtonColor = (activePage, page) => ({
	backgroundColor: activePage === page ? Colors.darkOrange : undefined,
	borderColor: Colors.darkOrange,
});

const setSegmentButtonText = (activePage, page) => ({
	color: activePage === page ? "white" : Colors.darkOrange,
});

function ReadingListScreen({books}) {
	const [activePage, setActivePage] = useState("To read");
	return (
		<Container>
			<Segment>
				<Button
					first
					style={setSegmentButtonColor(activePage, "To read")}
					active={activePage === "To read"}
					onPress={() => setActivePage("To read")}
				>
					<Text style={setSegmentButtonText(activePage, "To read")}>
						To read
					</Text>
				</Button>
				<Button
					style={setSegmentButtonColor(activePage, "Reading")}
					active={activePage === "Reading"}
					onPress={() => setActivePage("Reading")}
				>
					<Text style={setSegmentButtonText(activePage, "Reading")}>
						Reading
					</Text>
				</Button>
				<Button
					last
					style={setSegmentButtonColor(activePage, "Read")}
					active={activePage === "Read"}
					onPress={() => setActivePage("Read")}
				>
					<Text style={setSegmentButtonText(activePage, "Read")}>Read</Text>
				</Button>
			</Segment>
			<Content>
				<List>
					{books.map((book) => {
						if (book.status === activePage) {
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
				</List>
			</Content>
		</Container>
	);
}

ReadingListScreen.propTypes = BooksPropTypes;

const mapStateToProps = (state) => {
	return {
		books: state.books,
	};
};

export default connect(mapStateToProps)(ReadingListScreen);
