import React, {useState} from "react";
import {ScrollView, StyleSheet, View, Image, Modal} from "react-native";
import PropTypes from "prop-types";
import {
	Container,
	Text,
	Card,
	CardItem,
	Button,
	Content,
	Fab,
	Icon,
	Title,
	Form,
} from "native-base";
import Quote from "../components/Quote";
import {SafeAreaView} from "react-native-safe-area-context";
import BookDetailsFields from "../components/BookDetailsFields";
import {firestore} from "../constants/Firebase";
import {connect} from "react-redux";
import {deleteBook} from "../store/actions/quote";

function BookDetailsScreen({route, deleteBook, ...props}) {
	const {id, cover, name, author, quotes, status} = route.params;
	const [modalVisible, setModalVisible] = useState(false);
	const [form, setForm] = useState({cover, name, author, status});

	const navigateToEditQuote = () => {
		props.navigation.navigate("EditQuote", {id});
	};

	const handleDelete = () => {
		firestore
			.collection("books")
			.doc(id)
			.delete()
			.then(() => {
				deleteBook(id);
				setModalVisible(false);
				props.navigation.navigate("Books");
			})
			.catch((e) => console.error(e));
	};

	const handleSubmit = () => {
		console.log(form);
	};

	return (
		<>
			<Modal animationType="slide" transparent={true} visible={modalVisible}>
				<SafeAreaView style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<View style={{...StyleSheet.absoluteFillObject}}>
							<View style={styles.closeButtonContainer}>
								<Button
									onPress={() => {
										setModalVisible(false);
										setForm({name, author, cover, status});
									}}
									block
									rounded
									transparent
								>
									<Icon ios="ios-close-circle-outline" android="md-exit" />
								</Button>
							</View>
						</View>
						<Title>Edit book details</Title>
						<Form style={styles.formItem}>
							<BookDetailsFields
								name={form.name}
								author={form.author}
								cover={form.cover}
								status={form.status}
								setForm={setForm}
								form={form}
							/>
						</Form>
						<View style={styles.buttonsContainer}>
							<Button
								title="submit"
								block
								style={styles.button}
								onPress={() => handleSubmit()}
							>
								<Text>Change details</Text>
							</Button>
							<Button
								title="submit"
								block
								danger
								style={styles.button}
								onPress={() => handleDelete()}
							>
								<Text>Delete book</Text>
							</Button>
						</View>
					</View>
				</SafeAreaView>
			</Modal>
			<Container>
				<Card>
					<CardItem header bordered>
						<Image source={{uri: cover}} style={styles.cardImg} />
						<View style={styles.bookDescription}>
							<Text>{name}</Text>
							<Text note>{author}</Text>
							<Text note>Status: {status}</Text>
						</View>
						<View style={styles.editQuoteContainer}>
							<Button small block onPress={() => setModalVisible(true)}>
								<Text>Edit book</Text>
							</Button>
						</View>
					</CardItem>
				</Card>
				<Content>
					<Card>
						<CardItem>
							<ScrollView style={styles.scrollContainer}>
								{quotes.map((quote) => (
									<Quote key={quote.id} quote={quote} />
								))}
							</ScrollView>
						</CardItem>
					</Card>
				</Content>
				<Fab
					button
					position="bottomRight"
					secondary
					onPress={() => navigateToEditQuote()}
				>
					<Icon name="add" />
				</Fab>
			</Container>
		</>
	);
}

const styles = StyleSheet.create({
	bookDescription: {
		flex: 2,
	},
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 15,
		width: "100%",
	},
	cardImg: {
		flex: 1,
		height: 70,
		marginRight: 10,
		maxWidth: 40,
	},
	closeButtonContainer: {
		flexDirection: "row",
		justifyContent: "flex-end",
		margin: 10,
	},
	coverButton: {
		margin: 5,
	},
	editQuoteContainer: {
		flex: 1,
	},
	formItem: {
		marginTop: 50,
		width: "100%",
	},
	modalContainer: {
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.3)",
		flex: 1,
		justifyContent: "center",
	},
	modalContent: {
		alignItems: "center",
		backgroundColor: "white",
		height: "50%",
		padding: 20,
		width: "90%",
	},
});

BookDetailsScreen.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
	}),
	route: PropTypes.object,
	deleteBook: PropTypes.func,
	books: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => ({
	books: state.quoteReducer.books,
});

export default connect(mapStateToProps, {deleteBook})(BookDetailsScreen);
