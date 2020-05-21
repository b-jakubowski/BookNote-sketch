import React from "react";
import { Item, Icon, Input, Button } from "native-base";
import Colors from "../constants/Colors";
import { StyleSheet } from "react-native";

interface Props {
	onChangeText: (text: string) => void;
	onPress: () => void;
}

const Search: React.FC<Props> = ({ onChangeText, onPress }) => (
	<Item style={styles.searchBar}>
		<Icon type="Ionicons" name="ios-search" />
		<Input
			placeholder="Search"
			autoCorrect={false}
			onChangeText={onChangeText}
		/>
		<Button transparent small onPress={onPress}>
			<Icon
				type="Ionicons"
				name="md-close"
				style={{ color: Colors.darkOrange }}
			/>
		</Button>
	</Item>
);

const styles = StyleSheet.create({
	searchBar: {
		marginRight: 30,
		marginLeft: 30,
		marginBottom: 5,
	},
});

export default Search;
