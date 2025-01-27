'use client';

import { CartProductType } from '@prisma/client';
import { createContext, useState, useContext, useCallback, useEffect } from 'react';

import { toast } from 'react-toastify';
// import Product from '../app/product/[productId]/page';

type CartContextType = {
  cartProducts: CartProductType[] | null;
  subtotal: number;
  totalCartProduct: number;
  HandleAddProductToCart: (product: CartProductType) => void;
  handleProductQuantity: (product: CartProductType, flag: number) => void;
  handleRemoveFromCart: (product: CartProductType) => void;
  clearCartHandler: () => void;
  paymentIntent: string | null;
  handleSetPaymentIntent: (val: string | null) => void;
}

// Create a ThemeContext
export const CartContext = createContext<CartContextType | null>(null)

interface Props {
  [propName: string]: any;
}

// ThemeProvider component
export const CartContextProvider = ( props : Props) => {
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [totalCartProduct, setTotalCartProduct] = useState<number>(0);
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);



  const HandleAddProductToCart = useCallback(async (product: CartProductType) => {
    try {
      await setCartProducts((prev) => {

        if (prev) {
          return [...prev, product];
        } else {
          return [product];
        }
      });
      toast.success("Product added to cart successfully");
    } catch (error: any) {
      toast.error(error.message);
    }

  }, []);

  const calculateCartProductCount = useCallback((cartItems:CartProductType[] | null = null) => {
    const selectedProducts = cartItems || cartProducts;

    setTotalCartProduct(
      selectedProducts?.reduce((acc, product) => {
          return acc + product.quantity;
      }, 0) || 0
    )
  }, []);

  const calculateSubTotal = useCallback((cartItems:CartProductType[] | null = null) => {
    const selectedProducts = cartItems || cartProducts;
    setSubtotal(
      selectedProducts?.reduce((acc, product) => {
      return acc + product.price * product.quantity
    }, 0) || 0 )
  }, []);

  useEffect(() => {
    const eShopPaymentIntent:any = localStorage.getItem("eShopPaymentIntent");
    const paymentIntent: string | null = JSON.parse(eShopPaymentIntent);
    setPaymentIntent(paymentIntent);
  }, [])

  useEffect(() => {
    let cartItems = cartProducts;

    if (!cartItems) {
      const storedItems = localStorage.getItem("eShopCartItems");
      cartItems = storedItems ? JSON.parse(storedItems) : null;
    }

    if (cartItems) {
      localStorage.setItem('eShopCartItems', JSON.stringify(cartItems));
      setCartProducts(cartItems);
    } else {
      localStorage.removeItem('eShopCartItems');
    }

    calculateSubTotal(cartItems);
    calculateCartProductCount(cartItems);
  }, [cartProducts])

  const handleProductQuantity = useCallback(async (product: CartProductType, flag: number = 1) => {
    if (product.quantity >= 10 && flag > 0) {
      toast.warn("You can't add more than 10 items");
      return;
    }
    if (product.quantity <= 1 && flag < 0) {
      toast.warn("Quantity can't be less than 1");
      return;
    }

    try {
      setCartProducts((prev: CartProductType[] | null) => {

        if ( !prev) return null;

        return prev?.map(item => {
          if (item.id === product.id) {
            return {
              ...item,
              quantity: item.quantity + flag
            }
          }
          return item;
        })
      })

    } catch (error: any) {
      toast.error(error.message);
    }
  }, []);

  const handleRemoveFromCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      if(!prev) return null;
      return prev?.filter(item => item.id != product.id)
    });
  }, []);

  const clearCartHandler = useCallback(() => {
    localStorage.removeItem('eShopCartItems');
    setCartProducts(null);
  }, []);

  const handleSetPaymentIntent = useCallback((val: string | null) => {
    setPaymentIntent(val);
    localStorage.setItem("eShopPaymentIntent", JSON.stringify(val))
  }, [paymentIntent]);

  const value = {
    cartProducts,
    subtotal,
    totalCartProduct,
    HandleAddProductToCart,
    handleProductQuantity,
    handleRemoveFromCart,
    clearCartHandler,
    paymentIntent,
    handleSetPaymentIntent
  }

  return (
    <CartContext.Provider value={value} {...props} />
  );
};


export const useCart = () => {
    const context = useContext(CartContext);

    if(!context) {
        throw new Error('useCart must be used within a CartProvider');
    }

    return context;
}