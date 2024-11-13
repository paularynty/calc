import React, { createContext, useEffect, useState, ReactNode } from 'react';

interface Theme {
  darkMode: boolean;
}

interface ThemeContextType {
  theme: Theme;
  changeTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = window.localStorage.getItem('theme');
    return storedTheme ? JSON.parse(storedTheme) : { darkMode: false };
  });

  useEffect(() => {
    window.localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  const changeTheme = () => {
    setTheme((prevTheme) => ({ darkMode: !prevTheme.darkMode }));
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
