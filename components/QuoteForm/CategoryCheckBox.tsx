import React from "react";
import { View, Button, CheckBox, Text } from "native-base";
import { StyleSheet } from "react-native";

interface Props {
	category: string;
	checked: boolean;
	onPress: () => void;
}

const CategoryCheckBox: React.FC<Props> = ({ category, checked, onPress }) => {
	return (
		<View>
			<Button light small style={styles.categoryButton} onPress={onPress}>
				<CheckBox color={"black"} checked={checked} onPress={onPress} />
				<Text>{category}</Text>
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	categoryButton: {
		marginRight: 5,
		marginTop: 5,
	},
});

export default CategoryCheckBox;
