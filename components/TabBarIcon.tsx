import * as React from "react";
import { Icon } from "native-base";
import { StyleSheet } from "react-native";

import Colors from "../constants/Colors";

interface Props {
	focused: boolean;
	name: string;
	type: any;
}

const TabBarIcon: React.FC<Props> = ({ focused, name, type }) => {
	const iconColor = {
		color: focused ? Colors.darkOrange : Colors.tabIconDefault,
	};

	return <Icon name={name} type={type} style={[styles.icon, iconColor]} />;
};

const styles = StyleSheet.create({
	icon: {
		fontSize: 24,
		marginTop: 3,
	},
});

export default TabBarIcon;
