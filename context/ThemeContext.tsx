import React, { useState, createContext } from "react";

interface ThemeContext {
	mode: string;
	toggle: () => void;
}

const defaultMode = "light";

export const ManageThemeContext: React.Context<ThemeContext> = createContext({
	mode: defaultMode,
	toggle: () => {},
});

export const useTheme = () => React.useContext(ManageThemeContext);

export const ThemeManager: React.FC = ({ children }) => {
	const [themeState, setThemeState] = useState({
		mode: defaultMode,
	});

	const toggle = (): void => {
		setThemeState({ mode: themeState.mode === "light" ? `dark` : `light` });
	};

	return (
		<ManageThemeContext.Provider
			value={{
				mode: themeState.mode,
				toggle: toggle,
			}}
		>
			{children}
		</ManageThemeContext.Provider>
	);
};
