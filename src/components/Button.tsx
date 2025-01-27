
'use client'

import React from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'light' | 'lightoutline' | 'dark'
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  rounded?: string
  isLoading?: boolean
  width?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-300',
  secondary: 'bg-white border border-blue-700 text-blue-700 hover:text-white hover:bg-blue-800 focus:ring-blue-300',
  light: 'bg-white border border-slate-700 text-slate-700 focus:ring-slate-400',
  lightoutline: 'bg-transparent border border-textPrimary text-textPrimary focus:ring-slate-400 hover:opacity-80',
  dark: 'bg-slate-800 text-white hover:bg-slate-700 focus:ring-slate-400'
}

const sizeStyles: Record<ButtonSize, string> = {
  xs: 'px-2 py-1 text-sm',
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-6 py-3 text-lg'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth,
    rounded = 'md',
    isLoading,
    disabled,
    className = '',
    ...props
  }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`
          inline-flex items-center justify-center
          transition-all duration-200
          font-medium
          focus:outline-none focus:ring-2 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${rounded ? rounded : "rounded-md"}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        ) : null}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
