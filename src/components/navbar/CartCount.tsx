"use client";
import { useCart } from '@/src/providers/CartContextProvider'
import Link from 'next/link'
import React from 'react'
import { CiShoppingCart } from 'react-icons/ci'

const CartCount = () => {
  const {totalCartProduct} = useCart();
  return (
    <Link href="/cart">
        <div className="relative mr-[10px]">
            <CiShoppingCart size={30} />
            <div className="
                absolute
                top-[-10px]
                left-[14px]
                bg-slate-700
                dark:bg-black
                rounded-xl
                w-fit
                min-w-[24px]
                h-[24px]
                text-white
                text-center
                px-1
                py-[2px]
                text-[14px]
            ">
                {totalCartProduct}
            </div>
        </div>
    </Link>
  )
}

export default CartCount
