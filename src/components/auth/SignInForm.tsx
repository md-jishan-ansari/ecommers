'use client';
import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputFields from '../inputs/InputFields';
import Button from '../Button';
import Link from 'next/link';

import {signIn } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { SafeUser } from '@/src/types/types';

const formSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Passsword must be at least 8 characters"),
});

type FormData = z.infer<typeof formSchema>;

interface signInFormProps {
    currentUser: SafeUser | null
}

const SignInForm:React.FC<signInFormProps> = ({currentUser}) => {
    const router = useRouter();

    useEffect(() => {
        if(currentUser) {
            router.push('/cart');
            router.refresh();
        }
    }, []);

    const {
        register,
        handleSubmit,
        // setError,
        formState: { errors, isSubmitting }
    } = useForm<FormData>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: zodResolver(formSchema)
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {

        const {email, password} = data;
        signIn("credentials", {
            email,
            password,
            redirect: false,
        }).then((res) => {
            if(res?.ok) {
                router.push("/");
                router.refresh();
            }
            if(res?.error) {
                toast.error(res?.error);
            }
        })
    }

    if(currentUser) {
        return <p className="text-center">
            Logged in. Redirection...
        </p>
    }

  return (
    <>
        <h3 className="text-slate-800 dark:text-white text-3xl text-center font-semibold mb-2">Sign In</h3>
        <form onSubmit={handleSubmit(onSubmit)}>

            <div>
                <InputFields
                    label="Email"
                    register={register}
                    errors={errors}
                    name="email"
                    placeholder="Enter your email"
                />
            </div>

            <div className="mt-4">
                <InputFields
                    label="Password"
                    register={register}
                    errors={errors}
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                />
            </div>


            <div className="mt-6">
                {errors.root && <p className='text-red-600'>{errors.root.message}</p>}
                <Button
                    variant="dark"
                    size="md"
                    rounded="rounded-lg"
                    isLoading={false}
                    fullWidth
                    type="submit"
                >
                    {isSubmitting ? "Submitting..." : "Sign In" }
                </Button>


            </div>


        </form>

        <div className="flex items-center gap-2 my-3 text-slate-600">
            <div className="w-full border-b-[1px] border-slate-400" />
            <span>Or</span>
            <div className="w-full border-b-[1px] border-slate-400" />
        </div>

        <Button
            variant="dark"
            size="md"
            rounded="rounded-lg"
            isLoading={false}
            fullWidth
            onClick={() => signIn('google')}
        >
            Sign In with Google
        </Button>

        <p className='text-sm text-slate-700 dark:text-white mt-2'>{"If you don't have an account, please"} <Link href="/sign-up" className="text-blue-700 font-medium" >Sign Up</Link></p>
    </>
  )
}

export default SignInForm
