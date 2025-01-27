'use client';
import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputFields from '../inputs/InputFields';
import Button from '../Button';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { SafeUser } from '@/src/types/types';

const formSchema = z
    .object({
        name: z
            .string()
            .min(1, "Name is required"),
        email: z
            .string()
            .min(1, "Email is required")
            .email("Invalid email address"),
        password: z
            .string()
            .min(1, "Password is required")
            .min(8, "Passsword must be at least 8 characters"),
        confirmPassword: z
            .string()
            .min(1, "Confirm password is required")
            .min(8, "Passsword must be at least 8 characters"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Password do not match',
    });

type FormData = z.infer<typeof formSchema>;

interface signUpFormProps {
    currentUser: SafeUser | null
}

const SignUpForm:React.FC<signUpFormProps> = ({currentUser}) => {
    const router = useRouter();

    useEffect(() => {
        if(currentUser) {
            router.push('/');
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

    // const get_random_value = () => {
    //     return Math.floor(Math.random()*100) + 1;
    // }

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const {name, email, password} = data;
        axios({
            method: 'post',
            url: '/api/register',
            data: {
                name,
                email,
                password
            }
        }).then(() => {
            signIn('credentials', {
                email,
                password,
                redirect: false
            }).then((callback) => {
                if(callback?.ok) {
                    router.push('/');
                    router.refresh();
                }
                if(callback?.error) {
                    console.log(callback.error);
                }
            });
        }).catch((error: any) => {
            console.log(error);
        });
    }

    if(currentUser) {
        return <p className="text-center">
            Logged in. Redirection...
        </p>
    }

  return (
    <>
        <h3 className="text-slate-800 dark:text-white text-3xl text-center font-semibold mb-2">Sign Up</h3>
        <form onSubmit={handleSubmit(onSubmit)}>

            <div>
                <InputFields
                    label="Name"
                    register={register}
                    errors={errors}
                    name="name"
                    placeholder="Enter your Name"
                />
            </div>

            <div className="mt-4">
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

            <div className="mt-4">
                <InputFields
                    label="Confirm Password"
                    register={register}
                    errors={errors}
                    type="password"
                    name="confirmPassword"
                    placeholder="Enter your password again"
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
                    {isSubmitting ? "Submitting..." : "Sign Up" }
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
            Sign Up with Google
        </Button>

        <p className='text-sm text-slate-700 dark:text-white mt-2'>If you already have an account, please <Link href="/signin" className="text-blue-700 font-medium" >Sign In</Link></p>
    </>
  )
}

export default SignUpForm
