'use client'

import { yupResolver } from '@hookform/resolvers/yup';
import { GithubLogo, LinkedinLogo } from '@phosphor-icons/react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import * as yup from "yup";
import FormInput from "../FormInput";
import ModalContainer from './ModalContainer';

const contactFormSchema = yup.object({
  firstName: yup.string().required("This field is required"),
  lastName: yup.string().required("This field is required"),
  email: yup.string().email("Insert a valid email").required("This field is required"),
  subject: yup.string().required("This field is required"),
  content: yup.string().max(10000, "Your message is too long (Max: 10000 characters)").required("This field is required")
})

type ContactForm = yup.InferType<typeof contactFormSchema>

function Contact() {
  const [emailSent, setEmailSent] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<ContactForm>({
    resolver: yupResolver(contactFormSchema)
  });

  const onSubmit = handleSubmit((data) => {
    fetch(
      '/api/send',
      {
        method: 'POST',
        body: JSON.stringify(data)
      }
    ).then(() => {
      setEmailSent(true)
      toast("Message sent successfuly. Thank you!")
    })
  });

  return (
    <ModalContainer>
      <div className='flex flex-wrap gap-4 mb-4 justify-between'>
        <h1 className="text-5xl font-bold font-poppins">Contact Me</h1>
        <div className='flex gap-3 min-h-12'>
          <Link
            href="https://www.linkedin.com/in/bruno-borges-133564196/"
            className="bg-red-700 hover:bg-red-600 transition-all text-white h-12 w-12 overflow-hidden rounded-full grid place-items-center cursor-pointer"
          >
            <LinkedinLogo size={32} />
          </Link>

          <Link
            href="https://github.com/bruno-borges-2001"
            className="bg-red-700 hover:bg-red-600 transition-colors text-white h-12 w-12 aspect-square rounded-full grid place-items-center cursor-pointer"
          >
            <GithubLogo size={32} />
          </Link>
        </div>
      </div>

      <p className='text-sm text-slate-200'>
        You want to reach me, you are interested in my skills or just have something nice, send me a message here... It&apos;s FREE!!!
        <br></br>
        <br></br>
        You can also find me in my socials above!
      </p>

      <form onSubmit={onSubmit} className='mt-4 flex flex-col grow gap-2'>
        <div className='w-full flex flex-col sm:flex-row gap-2 sm:gap-4'>
          <FormInput label='First Name' registerProps={register("firstName")} error={errors.firstName?.message} />
          <FormInput label='Last Name' registerProps={register("lastName")} error={errors.lastName?.message} />
        </div>
        <div className='w-full flex flex-col sm:flex-row gap-2 sm:gap-4'>
          <FormInput label='Email' registerProps={register("email")} error={errors.email?.message} />
          <FormInput label='Subject' registerProps={register("subject")} error={errors.subject?.message} />
        </div>
        <FormInput label='Content' registerProps={register("content")} error={errors.content?.message} isTextArea className='min-h-[100px]' />

        <div className='flex justify-end items-center'>
          <input
            disabled={emailSent}
            type='submit'
            value="Send Message"
            className='cursor-pointer px-4 py-2 bg-red-600 hover:brightness-90 transition-all rounded-md text-lg font-semibold disabled:pointer-events-none disabled:bg-gray-500 disabled:opacity-70' />
        </div>
      </form>
    </ModalContainer>
  )
}

export default Contact
