import React from 'react'

interface CustomCheckBoxProps {
  id: string;
  label: string;
  disabled?: boolean;
  register: any;
  errors?: any;
}

const CustomCheckBox:React.FC<CustomCheckBoxProps> = ({
    id,
    label,
    disabled,
    register,
    // errors,
}) => {
  return (
    <div className="w-full flex flex-row gap-2 items-center">
        <input
             id={id}
             disabled={disabled}
             {...register(id)}
             placeholder=""
             type="checkbox"
             className={`cursor-pointer`}
        />
        <label htmlFor={id} className="font-medium cursor-pointer"> {label} </label>
    </div>
  )
}

export default CustomCheckBox
