import FormWrap from '@/src/components/FormWrap';
import React from 'react'

interface authLayoutProps {
    children: React.ReactNode;
}

const AuthLayout: React.FC<authLayoutProps> = ({ children }) => {

  return (
    <FormWrap>
        <div className="max-w-xl p-8 md:p-4 bg-slate-200 dark:bg-background">
            {children}
        </div>
    </FormWrap>
  )
}

export default AuthLayout
