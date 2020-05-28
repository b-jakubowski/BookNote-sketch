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
import { Store } from "../store/store";
import { connect } from "react-redux";
import styled from "styled-components";
import {
	foregroundColor,
	spacing,
	noteText,
	gray,
	black,
} from "../constants/Theme";
import { useTheme } from "../context/ThemeContext";

interface Props extends BookDetails {
	isEdit: boolean;
	id?: string | number;
	form: BookDetails;
	setForm: (f: BookDetails) => void;
	books: Book[];
}

const FormItem = styled(View)`
	background-color: ${foregroundColor};
	padding: ${spacing.m};
	margin-bottom: ${spacing.m};
`;
const TextTheme = styled(Text)`
	color: ${noteText};
`;
const AutocompleteList = styled(TouchableOpacity)`
	background-color: ${foregroundColor};
	padding: ${spacing.m};
	z-index: 100000;
`;

const BookDetailsFields: React.FC<Props> = ({
	books,
	id,
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
	const theme = useTheme();

	const textColor = theme.mode === "dark" ? gray[100] : black;

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
					navigation.navigate("Camera", {
						isEdit,
						id,
						initialBookValues: form,
					});
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
		<FormItem>
			<TextTheme note>Book</TextTheme>
			<Item style={{ zIndex: 2 }}>
				<Autocomplete
					autoCapitalize="none"
					autoCorrect={false}
					style={{ color: textColor, zIndex: 100000 }}
					containerStyle={styles.autocompleteContainer}
					inputContainerStyle={styles.autocompleteInput}
					listStyle={styles.autocompleteList}
					hideResults={showTitleResults}
					placeholderTextColor={textColor}
					placeholder="Book title"
					defaultValue={title}
					data={form.title ? filteredBookField("title") : []}
					keyExtractor={(item, index) => `${item.title}-${index}`}
					onChangeText={(value) => handleBookTitleChange(value)}
					renderItem={({ item }) => (
						<AutocompleteList
							onPress={() => handleAutocompleteItemPress(item.title, "title")}
						>
							<TextTheme>{item.title}</TextTheme>
						</AutocompleteList>
					)}
				/>
			</Item>
			<Item style={{ zIndex: 1 }}>
				<Autocomplete
					autoCapitalize="none"
					autoCorrect={false}
					style={{ color: textColor }}
					containerStyle={styles.autocompleteContainer}
					inputContainerStyle={styles.autocompleteInput}
					listStyle={styles.autocompleteList}
					hideResults={showAuthorResults}
					placeholderTextColor={textColor}
					placeholder="Book author"
					defaultValue={author}
					data={form.author ? filteredBookField("author") : []}
					keyExtractor={(item, index) => `${item.author}-${index}`}
					onChangeText={(value) => handleBookAuthorChange(value)}
					renderItem={({ item }) => (
						<AutocompleteList
							onPress={() => handleAutocompleteItemPress(item.author, "author")}
						>
							<TextTheme>{item.author}</TextTheme>
						</AutocompleteList>
					)}
				/>
			</Item>
			<Item>
				<Input
					placeholder="Cover URL"
					autoCorrect={false}
					style={{ color: textColor, flex: 2 }}
					placeholderTextColor={textColor}
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
					placeholder="Reading status"
					placeholderIconColor="#007aff"
					textStyle={{ color: textColor }}
					selectedValue={status}
					onValueChange={(value) => setForm({ ...form, status: value })}
				>
					<Picker.Item label="To read" value="To read" />
					<Picker.Item label="Reading" value="Reading" />
					<Picker.Item label="Read" value="Read" />
				</Picker>
			</Item>
		</FormItem>
	);
};

const styles = StyleSheet.create({
	autocompleteContainer: {
		flex: 2,
		paddingVertical: 12,
	},
	autocompleteList: {
		borderTopColor: "lightgrey",
		borderTopWidth: 1,
		marginTop: 8,
		paddingBottom: 8,
		elevation: 10,
	},
	autocompleteListItem: {
		padding: 12,
		backgroundColor: "white",
	},
	autocompleteInput: {
		paddingVertical: 4,
		borderWidth: 0,
	},
	coverButton: {
		marginVertical: 12,
	},
	coverInput: {
		flex: 2,
	},
});

const mapStateToProps = (state: Store) => ({
	books: state.books,
});

export default connect(mapStateToProps)(BookDetailsFields);
