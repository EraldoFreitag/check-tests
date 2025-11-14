import React, { createContext, useState, useMemo, useContext } from 'react';

// Define o tipo do tema
type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

// Cria o Context com valores padrão
export const ThemeContext = createContext<ThemeContextType>({
  themeMode: 'dark',
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const contextValue = useMemo(() => ({
    themeMode,
    toggleTheme,
  }), [themeMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);