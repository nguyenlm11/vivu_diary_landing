import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const toggleTheme = () => {
        setIsDarkTheme(prevTheme => !prevTheme);
    };

    const setThemeBasedOnTime = () => {
        const hour = new Date().getHours();
        const isDayTime = hour >= 6 && hour < 18;
        setIsDarkTheme(!isDayTime);
    };

    useEffect(() => {
        setThemeBasedOnTime();
        const interval = setInterval(setThemeBasedOnTime, 60 * 1000); // Kiểm tra mỗi phút
        return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
    }, []);

    return (
        <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
