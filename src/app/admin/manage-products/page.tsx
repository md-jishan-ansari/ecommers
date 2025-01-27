
import React from 'react'
import ManageProductsClient from './ManageProductsClient'
import getProducts from '@/src/actions/getProducts';
import getCurrentUser from '@/src/actions/getCurrentUser';
import NullData from '@/src/components/NullData';
import Container from '@/src/components/Container';

const ManageProducts = async () => {
  const products = await getProducts({category: null});
  const currentUser = await getCurrentUser();

  if(!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Access denied" />
  }

  return (
    <Container>
      <ManageProductsClient products={products} />
    </Container>
  )
}

export default ManageProducts
