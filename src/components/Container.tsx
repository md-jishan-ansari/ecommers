import React from 'react'

interface Props {
    children: React.ReactNode
}

const Container: React.FC<Props> = ({children}) => {
  return (
    <div className="
        max-w-[1920px]
        w-full
        mx-auto
        px-20
        lg:px-6
        sm:px-2
    ">
        {children}
    </div>
  )
}

export default Container
