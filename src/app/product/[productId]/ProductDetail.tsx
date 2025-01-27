'use client';

import React, { useCallback, useEffect, useState } from 'react'
import { ProductImage } from '@/src/types/types';
import RatingComponent from '@/src/components/products/RatingComponent';
import Button from '@/src/components/Button';
import ProductImages from '@/src/components/products/ProductImages';
import ProductColors from '@/src/components/products/ProductColors';
import { useCart } from '@/src/providers/CartContextProvider';
// import toaster from '@/src/utils/toaster';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { FaCheck } from "react-icons/fa6";
import SetQuantity from '@/src/components/products/SetQuantity';
import { CartProductType, Product, Review } from '@prisma/client';



interface ProductDetailProps {
  product: Product & {
    reviews: Review[]
  }
}

export const Horizontal = () => {
  return <hr className="w-[30%] my-3" />;
};

const ProductDetail:React.FC<ProductDetailProps> = ({product}) => {
  const { cartProducts, HandleAddProductToCart } = useCart();
  const [isProductOnCart, setIsProductOnCart] = useState<boolean>(false);
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: product.images[0],
    price: product.price,
    quantity: 1
  });
  const router = useRouter();

  const handleSelectedImg = useCallback((value: ProductImage) => {
    setCartProduct((prev) => ({
      ...prev,
      selectedImg: value
    }));
  }, [cartProduct.selectedImg]);

  const handleQuantityIncrease = useCallback(() => {
    if (cartProduct.quantity >= 10) {
      toast.warn("You can't add more than 10 items");
      return;
    }

    setCartProduct((prev) => ({
      ...prev,
      quantity: prev.quantity + 1
    }));
  }, [cartProduct.quantity]);

  const handleQuantityDecrease = useCallback(() => {
    if (cartProduct.quantity <= 1) {
      toast.warn("Quantity can't be less than 1");
      return;
    }

    setCartProduct((prev) => ({
      ...prev,
      quantity: prev.quantity - 1
    }));
  }, [cartProduct.quantity]);

  useEffect(() => {
    if (!cartProducts) return;

    const isInCart = cartProducts.some((product) => product.id === cartProduct.id);
    setIsProductOnCart(isInCart);
  }, [cartProducts])

  return (
    <div className="grid grid-cols-2 md:grid-cols-1 gap-8">
      <ProductImages
          cartProduct={cartProduct}
          images={product.images}
          handleSelectedImg={handleSelectedImg}
      />

      <div>
        <h3 className="font-medium text-3xl">{product.name}</h3>
        <div className="flex gap-2 items-center mt-3">
          <RatingComponent reviews={product?.reviews} />
          <p className="text-sm text-textSecodary">{product?.reviews.length} reviews</p>
        </div>

        <Horizontal />

        <p className="text-sm text-textSecodary">{product.description}</p>

        <Horizontal />

        <p className="text-sm"><span className="font-medium ">BRAND:</span> <span className="text-textSecodary">{product.brand}</span></p>
        <p className="text-sm mt-1"><span className="font-medium ">CATEGORY:</span> <span className="text-textSecodary">{product.category}</span></p>

        {product.inStock && <p className="text-teal-300 text-sm mt-1">In stock</p>}

        <Horizontal />

        {isProductOnCart ? (
          <>
          <div className="flex items-center gap-[4px] mb-2">
            <div className="rounded-full bg-teal-400 text-white p-[2px]"><FaCheck size="12" /></div>
            <p className="text-sm text-textSecodary">Product added to cart</p>
          </div>
          <div className="flex items-center gap-2 max-w-[300px]">
            <Button
              variant="lightoutline"
              size="md"
              rounded="rounded-lg"
              fullWidth
              isLoading={false}
              onClick={() => router.push('/cart')}
            >
              View Cart
            </Button>
          </div>
          </>
        ) : (
          <>
            <ProductColors
              cartProduct={cartProduct}
              images={product.images}
              handleSelectedImg={handleSelectedImg}
            />

            <Horizontal />

            <SetQuantity
              counter={false}
              cartProduct={cartProduct}
              handleQuantityIncrease={handleQuantityIncrease}
              handleQuantityDecrease={handleQuantityDecrease}
            />

            <Horizontal />

            <div className="max-w-[300px]">
              <Button
                variant="dark"
                size="md"
                rounded="rounded-lg"
                fullWidth
                isLoading={false}
                onClick={() => HandleAddProductToCart(cartProduct)}
              >
                Add To Cart
              </Button>
            </div>
          </>
        )}


      </div>
    </div>
  )
}

export default ProductDetail
