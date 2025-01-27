'use client'

import { UseFormRegister, FieldErrors } from "react-hook-form";

interface TextAreaProps {
    name: string;
    label: string;
    disabled?: boolean;
    required?: boolean;
    register: UseFormRegister<any>;
    placeholder?: string;
    errors: FieldErrors
}

const TextArea: React.FC<TextAreaProps> = ({
    name,
    label,
    disabled,
    required,
    register,
    errors,
    placeholder
}) => {
    return ( <div className="w-full relative">
        <label htmlFor={name} className="text-sm text-slate-950 dark:text-white font-medium mb-2">{label}</label>
        <textarea
            id={name}
            disabled={disabled}
            {...register(name, { required })}
            placeholder={placeholder}
            className={`
                peer
                w-full
                py-2
                px-3
                max-h-[150px]
                min-h-[150px]
                bg-white
                font-light
                focus:outline-slate-400
                border
                border-slate-300
                rounded-md
                disabled:opacity-70
                disabled:cursor-not-allowed

                dark:bg-transparent
                dark:text-white
            `}
        />
        {errors[name] && <p className='text-sm text-red-600 mt-1'>{errors[name]?.message?.toString()}</p>}
    </div> )
}

export default TextArea