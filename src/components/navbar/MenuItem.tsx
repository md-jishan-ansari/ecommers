import React from 'react'

interface MenuItemProps {
    children: React.ReactNode;
    onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ children, onClick }) => {
  return (
    <div className="
        py-3
        px-4
        hover:bg-slate-100
        dark:hover:bg-slate-600
        text-sm
        text-slate-700
        dark:text-textSecodary
        cursor-pointer
    "onClick={onClick}
    >
        {children}
    </div>
  )
}

export default MenuItem;
