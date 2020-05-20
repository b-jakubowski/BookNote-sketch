import React from "react";
import { Container } from "native-base";
import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const ContainerBackground: React.FC = ({ children }) => (
	<Container style={styles.container}>{children}</Container>
);

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.backgroundGrey,
	},
});

export default ContainerBackground;
