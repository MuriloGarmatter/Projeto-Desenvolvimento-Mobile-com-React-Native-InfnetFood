import React, { createContext, useState } from 'react';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

// Paletas de cores personalizadas
const lightThemeColors = {
  ...DefaultTheme.colors,
  background: '#fff',
  text: '#000',
  card: '#f9f9f9',
  border: '#ccc',
  subtleText: '#666',
};

const darkThemeColors = {
  ...DarkTheme.colors,
  background: '#121212',
  text: '#fff',
  card: '#1e1e1e',
  border: '#333',
  subtleText: '#aaa',
};

// Contexto de tema
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const colors = theme === 'light' ? lightThemeColors : darkThemeColors;
  const navigationTheme = theme === 'light' ? DefaultTheme : DarkTheme;

  const customizedNavigationTheme = {
    ...navigationTheme,
    colors: {
      ...navigationTheme.colors,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      primary: colors.primary,
      border: colors.border,
    },
  };

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, navigationTheme: customizedNavigationTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
