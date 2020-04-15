import React from "react";
import PropTypes from "prop-types";
import {View, Text, Item, Textarea} from "native-base";
import {StyleSheet} from "react-native";

export default function QuoteForm({quote, onChangeText}) {
	return (
		<View style={styles.formItem}>
			<Text note>Quote</Text>
			<Item>
				<Textarea
					rowSpan={5}
					bordered
					style={styles.quoteField}
					placeholder="Quote"
					onChangeText={onChangeText}
					value={quote}
				/>
			</Item>
		</View>
	);
}

const styles = StyleSheet.create({
	formItem: {
		marginBottom: 15,
	},
	quoteField: {
		width: "100%",
	},
});

QuoteForm.propTypes = {
	quote: PropTypes.string,
	onChangeText: PropTypes.func,
};
