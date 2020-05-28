import React from "react";
import { Item, Icon, Input, Button } from "native-base";
import styled from "styled-components";
import { iconColor, titleTextColor, spacing, orange } from "../constants/Theme";

interface Props {
	onChangeText: (text: string) => void;
	onPress: () => void;
}

const IconTheme = styled(Icon)`
	color: ${iconColor};
`;
const InputTheme = styled(Input)`
	color: ${titleTextColor};
`;
const SearchBar = styled(Item)`
	margin: ${spacing.s} ${spacing.l};
`;
const CloseIcon = styled(Icon)`
	color: ${orange[900]};
`;

const Search: React.FC<Props> = ({ onChangeText, onPress }) => (
	<SearchBar>
		<IconTheme type="Ionicons" name="ios-search" />
		<InputTheme
			placeholder="Search"
			autoCorrect={false}
			onChangeText={onChangeText}
		/>
		<Button transparent small onPress={onPress}>
			<CloseIcon type="Ionicons" name="md-close" />
		</Button>
	</SearchBar>
);

export default Search;
