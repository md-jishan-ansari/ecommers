"use client";
import Button from '@/src/components/Button';
import SetQuantity from '@/src/components/products/SetQuantity';
import { useCart } from '@/src/providers/CartContextProvider';
import { formatPrice } from '@/src/utils/formatPrice';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io';

const ProductCartLists = () => {
    const {cartProducts,subtotal, handleProductQuantity, handleRemoveFromCart, clearCartHandler} = useCart();
    const router = useRouter();

    // Early return if cart is empty
    if (!cartProducts || cartProducts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[300px]">
                <div>
                    <p className="text-2xl">Your cart is empty</p>
                    <Link href="/" className="flex items-center mt-3 text-textSecodary hover:underline underline-offset-3" ><IoIosArrowRoundBack size="24" /> Start Shopping</Link>
                </div>
            </div>
        )
    }

    return (
        cartProducts && (
            <>
                <div className="overflow-auto">
                    <div className="min-w-[720px]">
                        <div className="grid grid-cols-10 justify-between gap-4 w-full">
                            <div className="col-span-4"> <p className="text-xs">PRODUCT</p> </div>
                            <div className="col-span-2"> <p className="text-xs text-center">PRICE</p>  </div>
                            <div className="col-span-2"> <p className="text-xs text-center">QUANTITY</p>  </div>
                            <div className="col-span-2"> <p className="text-xs text-end">TOTAL</p> </div>
                        </div>

                        <hr className="my-2" />


                        {cartProducts.map(product => (
                            <div key={product.id} >
                                <div className="grid grid-cols-10 justify-between gap-4 w-full my-4">
                                    <div className="col-span-4">
                                        <div className="flex gap-2">
                                            <div className="max-h-20 min-w-20">
                                                <Image
                                                    src={product.selectedImg.image}
                                                    alt={product.name}
                                                    width="80"
                                                    height="80"

                                                    className="h-full object-contain cursor-pointer"
                                                    onClick={() => router.push('/product/' + product.id)}
                                                />
                                            </div>
                                            <div className="my-auto flex gap-1 flex-col w-[calc(100%-5rem)]">
                                                <p className="truncate w-full text-sm">{product.name}</p>
                                                <p className="text-sm">{product.selectedImg.color}</p>
                                                <p
                                                    className="text-sm underline text-textSecodary cursor-pointer"
                                                    onClick={() => handleRemoveFromCart(product)}
                                                >remove</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-2 text-center flex justify-center items-center">
                                        <p className="text-sm">{formatPrice(product.price)}</p>
                                    </div>
                                    <div className="col-span-2 text-center flex justify-center items-center">
                                        <SetQuantity
                                            counter={true}
                                            cartProduct={product}
                                            handleQuantityIncrease={() => handleProductQuantity(product, 1)}
                                            handleQuantityDecrease={() => handleProductQuantity(product, -1)}
                                        />
                                    </div>
                                    <div className="col-span-2 flex items-center justify-end">
                                        <p className="font-semibold text-sm">{formatPrice(product.price * product.quantity)}</p>
                                    </div>
                                </div>
                                <hr className="my-2" />
                            </div>
                        ))}
                    </div>
                </div>


                <div className="mt-3 mb-11 flex justify-between align-top w-full sm:flex-wrap sm:gap-10">
                    <div className="max-h-fit sm:w-full">
                        <Button
                            variant='lightoutline'
                            rounded="rounded-md"
                            size="xs"
                            onClick={clearCartHandler}
                        >
                            Clear Cart
                        </Button>
                    </div>

                    <div className="sm:w-full">
                        <div className="flex justify-between text-md font-semibold">
                            <p>Subtotal</p>
                            <p>{formatPrice(subtotal)}</p>
                        </div>
                        <p className="text-md my-2 text-textSecodary">Taxes and shipping calculate at checkout</p>
                        <Button
                            variant='dark'
                            rounded="rounded-lg"
                            size="lg"
                            fullWidth
                            onClick={() => router.push('/checkout')}
                        >
                           Checkout
                        </Button>
                        <Link href="/" className="flex items-center mt-3 text-textSecodary hover:underline underline-offset-3" ><IoIosArrowRoundBack size="24" /> Start Shopping</Link>

                    </div>
                </div>
            </>
        )
    )
}

export default ProductCartLists
