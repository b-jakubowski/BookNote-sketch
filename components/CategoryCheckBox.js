import React from "react";
import PropTypes from "prop-types";
import {View, Button, CheckBox, Text} from "native-base";
import {StyleSheet} from "react-native";

export default function CategoryCheckBox({category, onPress, checked}) {
	return (
		<View>
			<Button light small style={styles.categoryButton} onPress={onPress}>
				<CheckBox
					name={category}
					color={"black"}
					value={category}
					checked={checked}
					onPress={onPress}
				/>
				<Text>{category}</Text>
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	categoryButton: {
		marginRight: 5,
		marginTop: 5,
	},
});

CategoryCheckBox.propTypes = {
	category: PropTypes.string,
	onPress: PropTypes.func,
	checked: PropTypes.bool,
};
