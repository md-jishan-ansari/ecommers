"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from 'next/navigation';

export const ThemeContext = createContext({
    theme: 'light' as string | null,
    excludedUrls: [] as string[],
    toggleTheme: () => {},
})

interface ThemeContextProviderProps {
    [propsName: string]: any
}

export const ThemeContextProvider = (props: ThemeContextProviderProps) => {
    const [theme, setTheme] = useState<string | null>(null);
    let pathname = usePathname();
    pathname = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

    const excludedUrls: string[] = ['/admin/manage-products', '/admin/manage-orders', '/orders'];
    // const excludedUrls: string[] = [];

    useEffect(() => {
        // Access localStorage safely inside useEffect
        const storedTheme = localStorage.getItem('theme');
        setTheme(storedTheme);
    }, []);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');

        if (excludedUrls.includes(pathname)) {
            document.documentElement.classList.remove('dark');
        } else {
            if (savedTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    }, [pathname, theme]);

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            setTheme('light');
            localStorage.setItem('theme', 'light');
        }
    }

    const value = {
        theme: excludedUrls.includes(pathname) ? 'light' : theme,
        excludedUrls,
        toggleTheme,
    }

    return <ThemeContext.Provider value={value} {...props} />
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeContextProvider');
    }

    return context;
}