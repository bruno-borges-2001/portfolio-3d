import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { cn } from '../utils/style'

type InputIntersectionTypes = React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>

interface FormInputProps extends InputIntersectionTypes {
  label: string
  registerProps: UseFormRegisterReturn
  error?: string

  isTextArea?: boolean
}

const defaultClassName = "px-4 py-2 outline-slate-800 rounded-sm bg-slate-500"

function FormInput({ label, registerProps, error, isTextArea, className, ...rest }: FormInputProps) {
  return (
    <div className='flex flex-col gap-1 grow'>
      <label className='font-poppins'>{label}</label>
      {
        isTextArea
          ? <textarea {...rest} {...registerProps} placeholder='Type Here...' className={cn(defaultClassName, 'resize-none grow', className)} />
          : <input {...rest} {...registerProps} placeholder='Type Here...' className={cn(defaultClassName, className)} />
      }
      <p className='text-xs relative -top-1 text-red-600'>&#8203;{error}</p>
    </div>
  )
}

export default FormInput
