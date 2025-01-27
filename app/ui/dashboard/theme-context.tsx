'use client';

import { createContext, useState, ReactNode, useContext, useCallback } from 'react';

export const themes = ['light', 'dark', 'blue'];
export type Themes = typeof themes[number];

type ThemeContextType = {
  theme: Themes;
  setTheme: (theme: Themes) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'blue',
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  console.log('theme provider', new Date().toISOString());
  let localTheme: Themes = 'light';
  if (typeof window !== 'undefined')  {
      localTheme = localStorage.getItem('theme') as Themes;
  }
  const [theme, setTheme] = useState<Themes>(localTheme);

  const changeTheme = useCallback( (newTheme: Themes) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }, [theme]);

  return (
    <div className={theme}>
      <ThemeContext.Provider value={{ theme, setTheme: changeTheme }}>
        {children}
      </ThemeContext.Provider>
    </div> 
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};