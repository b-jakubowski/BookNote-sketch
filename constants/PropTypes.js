import PropTypes from "prop-types";

export const BooksPropTypes = {
	books: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string,
			author: PropTypes.string,
			cover: PropTypes.string,
			status: PropTypes.string,
			quotes: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.string,
					categories: PropTypes.arrayOf(PropTypes.string),
					quote: PropTypes.string,
				})
			),
		})
	),
};
