import React from 'react'

import {ProductImage} from '@/src/types/types';
import Image from 'next/image';
import { CartProductType } from '@prisma/client';

interface ProductImagesProps {
  cartProduct: CartProductType,
  images: ProductImage[],
  handleSelectedImg: (value: ProductImage) => void
}

const ProductImages:React.FC<ProductImagesProps> = ({images, cartProduct, handleSelectedImg}) => {

  return (
    <div className="flex gap-4 lg:flex-col-reverse lg:justify-between">

        <div className="lgup:w-[150px] lgup:overflow-y-auto lgup:max-h-[480px] lg:overflow-x-auto">
          <div className="h-full p-3 border rounded-md flex flex-col  gap-3 justify-center lg:min-w-full lg:w-fit lg:h-[150px] lg:flex-row">

            {images && images.map((image) => (
                <div key={image.color}
                  onClick={() => handleSelectedImg(image)}
                  className={`
                      w-full aspect-square

                      ${image.color === cartProduct.selectedImg.color ? 'border-[1.5px] border-teal-300' : '' }
                      rounded-sm
                      relative
                      cursor-pointer
                      `
                  }
                >
                    <Image
                        src={image.image}
                        width="100"
                        height="100"
                        alt={image.color}
                        className="w-full h-full object-contain absolute top-0 left-0"
                    />
                </div>
            ))}

          </div>
        </div>

        <div className="w-full relative min-h-[450px] max-h-[520px]">
          <Image
            src={cartProduct.selectedImg.image}
            width="300"
            height="300"
            alt={cartProduct.name}
            className=" absolute top-0 left-0 w-full h-full object-contain"
          />
        </div>
    </div>

  )
}

export default ProductImages
