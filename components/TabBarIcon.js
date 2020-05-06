import * as React from "react";
import PropTypes from "prop-types";
import {Icon} from "native-base";
import {StyleSheet} from "react-native";

import Colors from "../constants/Colors";

export default function TabBarIcon({focused, name, type}) {
	const iconColor = {
		color: focused ? Colors.darkOrange : Colors.tabIconDefault,
	};

	return <Icon name={name} type={type} style={[styles.icon, iconColor]} />;
}

const styles = StyleSheet.create({
	icon: {
		fontSize: 24,
		marginTop: 3,
	},
});

TabBarIcon.propTypes = {
	focused: PropTypes.bool,
	name: PropTypes.string,
	type: PropTypes.string,
};
