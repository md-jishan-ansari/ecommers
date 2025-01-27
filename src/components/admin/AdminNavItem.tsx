import React from 'react'
import { IconType } from 'react-icons';

interface AdminNavItemProps {
    selected?: boolean;
    icon: IconType;
    label: string
}

const AdminNavItem: React.FC<AdminNavItemProps> = ({selected, icon: Icon, label}) => {
  return (
    <div className={
        `flex items-center justify-center text-center gap-1 p-2 border-b-2
        hover:text-slate-800 dark:hover:text-white
        transition cursor-pointer
        ${selected ?
          "border-b-slate-800 text-slate-800 dark:text-white dark:border-b-white" :
          "border-transparent text-slate-500 dark:text-slate-400"}
        `
    }>
        <Icon size={20} />
        <div className='font-medium text-sm text-center break-normal'>{label}</div>
    </div>
  )
}

export default AdminNavItem
