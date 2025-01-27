
import Container from '@/src/components/Container';
import React from 'react'
import ProductCartLists from './ProductCartLists';

const Cart = () => {
  return (
    <Container>
      <h3 className="font-semibold text-2xl my-6 text-center">Shopping Cart</h3>
      <ProductCartLists />
    </Container>
  )
}

export default Cart;