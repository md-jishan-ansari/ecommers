"use client";
import React from 'react'

import Image from 'next/image';
import RatingComponent from './RatingComponent';
import {useRouter} from 'next/navigation';
import { formatPrice } from '@/src/utils/formatPrice';
import { Product, Review } from '@prisma/client';

interface ProductProps {
    product: Product & {
      reviews: Review[]
    };
}

const ProductItem: React.FC<ProductProps> = ({product}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/product/${product.id}`)}
      className="
        border
        border-slate-200
        p-5
        rounded-lg
        bg-backgroundTertiary
        shadow-sm
        transition-all
        hover:scale-105
        hover:shadow-md
        cursor-pointer
        text-center
      ">
        <div className="h-[200px] mb-3">
          <Image
            src={product.images[0].image}
            alt={product.name}
            width="300"
            height="400"
            className="object-contain w-full h-full"
          />
        </div>
        <p className="truncate text-sm mb-2">{product.name}</p>
        <div className="flex justify-center">
          <RatingComponent  reviews={product?.reviews} />
        </div>
        <p className="text-sm mt-2">{product.reviews.length} reviews</p>
        <p className="text-md font-medium mt-1">{formatPrice(product.price)}</p>
    </div>
  )
}

export default ProductItem
