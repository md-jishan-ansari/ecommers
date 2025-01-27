'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from './ThemeContextProvider';
import { useEffect, useState } from 'react';

export default function ToastProvider() {
    const [toasterTheme, setToasterTheme] = useState('colored');
    const {theme} = useTheme();

    useEffect(() => {
        if (theme === 'dark') {
            setToasterTheme('dark');
        } else {
            setToasterTheme('colored');
        }
    }, [theme]);

    return (
        <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={toasterTheme}
        />
    );
}