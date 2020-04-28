import {Ionicons} from "@expo/vector-icons";
import * as React from "react";
import PropTypes from "prop-types";

import Colors from "../constants/Colors";

export default function TabBarIcon({focused, name}) {
	return (
		<Ionicons
			name={name}
			size={30}
			color={focused ? Colors.darkOrange : Colors.tabIconDefault}
		/>
	);
}

TabBarIcon.propTypes = {
	focused: PropTypes.bool,
	name: PropTypes.string,
};
