import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const getInitailDarkMode = () => {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme:dark').matches
  const storedDarkMode = localStorage.getItem('darkTheme') === 'true'
  return storedDarkMode || prefersDarkMode
}
export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitailDarkMode());
  const [searchTerm, setSearchTerm] = useState('car')

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
      // const body = document.querySelector("body");
      // body.classList.toggle('dark-theme',newDarkTheme)
    localStorage.setItem('dark-theme',newDarkTheme)
  };
  useEffect(() => {
    document.body.classList.toggle('dark-theme',isDarkTheme)
  },[isDarkTheme])
  return (
    <AppContext.Provider value={{ isDarkTheme, toggleDarkTheme,searchTerm,setSearchTerm }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
