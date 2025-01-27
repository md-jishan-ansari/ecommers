import React from 'react'

interface BackDropProps {
  onClick?: () => void
}

const BackDrop: React.FC<BackDropProps> = ({onClick}) => {
  return (
    <div onClick={onClick} className="fixed top-0 left-0 w-full h-full bg-slate-200 opacity-50 z-20">

    </div>
  )
}

export default BackDrop
