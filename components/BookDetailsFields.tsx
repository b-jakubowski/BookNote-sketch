import React, { useState } from "react";
import {
	View,
	Text,
	Item,
	Input,
	Button,
	Picker,
	Icon,
	ActionSheet,
} from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import Autocomplete from "react-native-autocomplete-input";

import { BookDetails, Book } from "../interfaces/book.interface";
import { BookForm } from "../screens/AddBookScreen";
import { Store } from "../store/store";
import { connect } from "react-redux";

interface Props extends BookDetails {
	isEdit: boolean;
	form: BookForm;
	setForm: (f: BookForm) => void;
	books: Book[];
}

const BookDetailsFields: React.FC<Props> = ({
	books,
	title,
	author,
	cover,
	status,
	isEdit,
	form,
	setForm,
}) => {
	const [showTitleResults, setShowTitleResults] = useState(true);
	const [showAuthorResults, setShowAuthorResults] = useState(true);
	const navigation = useNavigation();

	const getPermissionAndPickImage = async () => {
		if (Constants.platform.ios) {
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

			if (status !== "granted") {
				alert("Sorry, we need camera roll permissions to make this work!");
				return;
			}
			_pickImage();
		}
		_pickImage();
	};

	const _pickImage = async () => {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [1, 1.6],
				quality: 0.2,
			});
			if (!result.cancelled) {
				setForm({ ...form, cover: result.uri });
			}
		} catch (E) {
			console.log(E);
		}
	};

	const chooseImgSource = () => {
		ActionSheet.show(
			{
				options: ["Choose image from a phone", "Take a photo", "Cancel"],
				cancelButtonIndex: 2,
				title: "",
			},
			(buttonIndex) => {
				if (buttonIndex === 0) {
					getPermissionAndPickImage();
				}
				if (buttonIndex === 1) {
					navigation.navigate("Camera", { isEdit });
				}
			}
		);
	};

	const filteredBookField = (field: "title" | "author") =>
		books.filter((book) =>
			book[field].toLowerCase().includes(form[field].toLowerCase())
		);

	const handleBookTitleChange = (value: string) => {
		setForm({ ...form, title: value });
		if (showTitleResults) {
			setShowTitleResults(false);
		}
	};

	const handleBookAuthorChange = (value: string) => {
		setForm({ ...form, author: value });
		if (showAuthorResults) {
			setShowAuthorResults(false);
		}
	};

	const handleAutocompleteItemPress = (value: string, key: string) => {
		setForm({ ...form, [key]: value });
		key === "title" ? setShowTitleResults(true) : setShowAuthorResults(true);
	};

	return (
		<View style={styles.formItem}>
			<Text note>Book</Text>
			<Item style={{ zIndex: 2 }}>
				<Autocomplete
					autoCapitalize="none"
					autoCorrect={false}
					style={styles.autocomplete}
					containerStyle={styles.autocompleteContainer}
					inputContainerStyle={styles.autocompleteInput}
					listStyle={styles.autocompleteList}
					hideResults={showTitleResults}
					placeholder="Book title"
					defaultValue={title}
					data={form.title ? filteredBookField("title") : []}
					keyExtractor={(item, index) => `${item.title}-${index}`}
					onChangeText={(value) => handleBookTitleChange(value)}
					renderItem={({ item }) => (
						<TouchableOpacity
							style={styles.autocompleteListItem}
							onPress={() => handleAutocompleteItemPress(item.title, "title")}
						>
							<Text style={styles.itemText}>{item.title}</Text>
						</TouchableOpacity>
					)}
				/>
			</Item>
			<Item style={{ zIndex: 1 }}>
				<Autocomplete
					autoCapitalize="none"
					autoCorrect={false}
					style={styles.autocomplete}
					containerStyle={styles.autocompleteContainer}
					inputContainerStyle={styles.autocompleteInput}
					listStyle={styles.autocompleteList}
					hideResults={showAuthorResults}
					placeholder="Book author"
					defaultValue={author}
					data={form.author ? filteredBookField("author") : []}
					keyExtractor={(item, index) => `${item.author}-${index}`}
					onChangeText={(value) => handleBookAuthorChange(value)}
					renderItem={({ item }) => (
						<TouchableOpacity
							style={styles.autocompleteListItem}
							onPress={() => handleAutocompleteItemPress(item.author, "author")}
						>
							<Text style={styles.itemText}>{item.author}</Text>
						</TouchableOpacity>
					)}
				/>
			</Item>
			<Item>
				<Input
					placeholder="Cover URL"
					autoCorrect={false}
					style={styles.coverInput}
					onChangeText={(value) => setForm({ ...form, cover: value })}
					value={cover}
				/>
				<Button
					style={styles.coverButton}
					small
					light
					onPress={() => chooseImgSource()}
				>
					<Text>Choose img</Text>
				</Button>
			</Item>
			<Item picker>
				<Picker
					mode="dropdown"
					iosIcon={<Icon name="arrow-down" />}
					style={styles.picker}
					placeholder="Reading status"
					placeholderIconColor="#007aff"
					selectedValue={status}
					onValueChange={(value) => setForm({ ...form, status: value })}
				>
					<Picker.Item label="To read" value="To read" />
					<Picker.Item label="Reading" value="Reading" />
					<Picker.Item label="Read" value="Read" />
				</Picker>
			</Item>
		</View>
	);
};

const styles = StyleSheet.create({
	autocomplete: {
		fontSize: 16,
	},
	autocompleteContainer: {
		flex: 1,
		paddingVertical: 10,
	},
	autocompleteList: {
		borderTopColor: "lightgrey",
		borderTopWidth: 1,
		marginTop: 7,
		paddingBottom: 5,
	},
	autocompleteListItem: {
		padding: 10,
		backgroundColor: "white",
	},
	autocompleteInput: {
		paddingVertical: 5,
		borderWidth: 0,
	},
	coverButton: {
		marginVertical: 10,
	},
	coverInput: {
		flex: 2,
	},
	formItem: {
		padding: 10,
		marginBottom: 15,
		backgroundColor: "white",
	},
	picker: {
		width: undefined,
	},
	itemText: {
		fontSize: 15,
		margin: 2,
	},
});

const mapStateToProps = (state: Store) => ({
	books: state.books,
});

export default connect(mapStateToProps)(BookDetailsFields);
