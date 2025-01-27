"use client";
import { CartProductType } from '@prisma/client';
import React from 'react'

interface SetQuantityProps {
  counter: boolean,
  cartProduct: CartProductType,
  handleQuantityIncrease: () => void,
  handleQuantityDecrease: () => void,
}

const SetQuantity:React.FC<SetQuantityProps> = ({counter, cartProduct, handleQuantityIncrease, handleQuantityDecrease}) => {

  return (
    <div className="flex gap-4 ">
        {!counter && <p className="text-sm  mt-1"><span className="font-medium ">QUANTITY:</span></p>}
        <div className="flex align-center gap-2">
            <button className="border rounded-[4px] w-6 border-slate-200" onClick={handleQuantityDecrease}>-</button>
            <p className="text-center min-w-8">{cartProduct?.quantity}</p>
            <button className="border rounded-[4px] w-6  aspect-square border-slate-200" onClick={handleQuantityIncrease} >+</button>
        </div>
    </div>
  )
}

export default SetQuantity
