import React from "react";
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
import {StyleSheet} from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import PropTypes from "prop-types";
import {useNavigation} from "@react-navigation/native";

export default function BookDetailsFields({
	name,
	author,
	cover,
	status,
	isEdit,
	form,
	setForm,
}) {
	const navigation = useNavigation();

	const getPermissionAndPickImage = async () => {
		if (Constants.platform.ios) {
			const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);

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
				setForm({...form, cover: result.uri});
			}
		} catch (E) {
			console.log(E);
		}
	};

	const chooseImgSource = () => {
		ActionSheet.show(
			{
				options: ["Choose image from files", "Take a photo", "Cancel"],
				cancelButtonIndex: 2,
				title: "",
			},
			(buttonIndex) => {
				if (buttonIndex === 0) {
					getPermissionAndPickImage();
				}
				if (buttonIndex === 1) {
					navigation.navigate("Camera", {isEdit});
				}
			}
		);
	};

	return (
		<View style={styles.formItem}>
			<Text note>Book</Text>
			<Item>
				<Input
					placeholder="Name"
					autoCorrect={false}
					onChangeText={(value) => setForm({...form, name: value})}
					value={name}
				/>
			</Item>
			<Item>
				<Input
					placeholder="Author"
					autoCorrect={false}
					onChangeText={(value) => setForm({...form, author: value})}
					value={author}
				/>
			</Item>
			<Item>
				<Input
					placeholder="Cover URL"
					autoCorrect={false}
					style={styles.coverInput}
					onChangeText={(value) => setForm({...form, cover: value})}
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
					onValueChange={(value) => setForm({...form, status: value})}
				>
					<Picker.Item label="To read" value="To read" />
					<Picker.Item label="Reading" value="Reading" />
					<Picker.Item label="Read" value="Read" />
				</Picker>
			</Item>
		</View>
	);
}

BookDetailsFields.propTypes = {
	name: PropTypes.string,
	author: PropTypes.string,
	cover: PropTypes.string,
	status: PropTypes.string,
	isEdit: PropTypes.bool,
	form: PropTypes.object,
	setForm: PropTypes.func,
};

const styles = StyleSheet.create({
	coverButton: {
		marginVertical: 10,
	},
	coverInput: {
		flex: 2,
	},
	formItem: {
		marginBottom: 15,
	},
	picker: {
		width: undefined,
	},
});
