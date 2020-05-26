import theme from "styled-theming";

const spacing = {
	s: 8,
	m: 16,
	l: 24,
	xl: 40,
};

const fontSize = {
	s: 8,
	sm: 12,
	m: 16,
	ml: 20,
	l: 24,
	xl: 30,
};

const fontFamily = {
	roboto: "Roboto",
	gotu: "gotu",
};

const orange = {
	100: "#FFE57F",
	300: "#FFD54F",
	500: "#FFC107",
	700: "#FFAB00",
	800: "#FF8F00",
	900: "#FF6F00",
};

const gray = {
	100: "#F5F5F5",
	300: "#E0E0E0",
	500: "#9E9E9E",
	700: "#616161",
	800: "#424242",
	900: "#212121",
};

const brown = {
	100: "#D7CCC8",
	300: "#A1887F",
	500: "#795548",
	700: "#5D4037",
	800: "#4E342E",
	900: "#3E2723",
};

const green = {
	100: "#CCFF90",
	200: "#B2FF59",
	400: "#76FF03",
	700: "#64DD17",
	800: "#558B2F",
	900: "#33691E",
};

const white = "#fcfcfc";

export const backgroundColor = theme("mode", {
	light: gray[100],
	dark: gray[900],
});

export const foregroundColor = theme("mode", {
	light: white,
	dark: gray[300],
});

export const navigationColor = theme("mode", {
	light: white,
	dark: gray[500],
});

export const navigationFocusedBtn = theme("mode", {
	light: orange[800],
	dark: orange[300],
});

export const navigationBtn = theme("mode", {
	light: white,
	dark: gray[500],
});
