import React from 'react'

import {ProductImage} from '@/src/types/types';
import { CartProductType } from '@prisma/client';

interface ProductColorsProps {
  images: ProductImage[],
  cartProduct: CartProductType,
  handleSelectedImg: (value: ProductImage) => void
}

const ProductColors:React.FC<ProductColorsProps> = ({images, cartProduct, handleSelectedImg}) => {

  return (
    <div className="flex gap-3">
      <p className="text-sm mt-1"><span className="font-medium ">COLOR:</span></p>

      <div className="flex gap-3">
        {images && images.map((image) => (
          <div key={image.color}
            onClick={() => handleSelectedImg(image)}
            className={`
              p-[3px]
              ${image.color === cartProduct.selectedImg.color ? 'border-[1.5px] border-teal-300' : '' }
              rounded-full
            `}
          >
            <div style={{backgroundColor: image.colorCode}} className={`w-5 h-5 border rounded-full bg-green cursor-pointer`}></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductColors
