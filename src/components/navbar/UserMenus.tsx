'use client';
import React, { useState } from 'react'
import Button from '../Button'
import Link from 'next/link';

import { IoMdArrowDropdown } from "react-icons/io";
import MenuItem from './MenuItem';
import BackDrop from './BackDrop';
import Avatar from '../Avatar';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SafeUser } from '@/src/types/types';

const Auth = ({currentUser}: {currentUser: SafeUser | null}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const togleOpen = () => {
    setIsOpen(!isOpen);
  }


  return (
    <div className="relative">

        <Button
          variant="lightoutline"
          size="sm"
          rounded="rounded-3xl"
          isLoading={false}
          onClick={togleOpen}
        >
          <Avatar image={currentUser?.image} />
          <IoMdArrowDropdown size={24} />
        </Button>


        {isOpen && (
          <div className="
            absolute
            top-12
            right-0
            z-30
            bg-white
            dark:bg-backgroundSecondary
            shadow-md
            rounded-md
            min-w-44
            overflow-hidden
            text-sm
            "
          >
            {currentUser ? (
              <>
                <MenuItem  onClick={() => {togleOpen(); router.push('/orders')}} >Your Orders</MenuItem>

                {currentUser.role === 'ADMIN' && (
                  <MenuItem onClick={() => {togleOpen(); router.push('/admin')}} >Admin Dashboard</MenuItem>
                )}

                <hr />

                <MenuItem  onClick={() => signOut()}>Logout</MenuItem>

              </>
            ) : (
              <>
                <Link href="/signin" >
                  <MenuItem  onClick={togleOpen}>Login</MenuItem>
                </Link>
                <Link href="/sign-up" >
                  <MenuItem  onClick={togleOpen}>Sign Up</MenuItem>
                </Link>
              </>
            )}
          </div>
        )}

        {isOpen && <BackDrop onClick={() => setIsOpen(!isOpen)} />}

    </div>
  )
}

export default Auth
