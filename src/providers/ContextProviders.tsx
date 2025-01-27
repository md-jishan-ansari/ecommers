'use client';
import React from 'react'
import { CartContextProvider } from './CartContextProvider';
import { ThemeContextProvider } from './ThemeContextProvider';
import ToastProvider from './ToastProvider';

interface ContextProvidersProps {
    children: React.ReactNode;
}

const ContextProviders:React.FC<ContextProvidersProps> = ({children}) => {
  return (
    <ThemeContextProvider>
      <ToastProvider />
      <CartContextProvider>
        {children}
      </CartContextProvider>
    </ThemeContextProvider>
  )
}

export default ContextProviders
