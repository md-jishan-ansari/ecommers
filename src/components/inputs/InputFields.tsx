import { FieldErrors, UseFormRegister } from "react-hook-form";

interface InputFieldProps {
    label: string;
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
    name: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
}

const InputFields: React.FC<InputFieldProps> = ({
    label,
    register,
    errors,
    name,
    type = "text",
    placeholder
}) => {
  return (
    <div>
        <label htmlFor={name} className="text-sm text-slate-950 dark:text-white font-medium mb-2">{label}</label>
        <input
            type={type}
            id={name}
            className="
                inline-block
                w-full
                py-2
                px-3
                rounded-md
                text-sm
                text-slate-800
                focus:outline-slate-400
                border
                border-slate-300

                dark:bg-transparent
                dark:text-white
            "
            placeholder={placeholder}
            {...register(name)}
        />
        {errors[name] && <p className='text-sm text-red-600 mt-1'>{errors[name]?.message?.toString()}</p>}
    </div>
  )
}

export default InputFields
