
import React from 'react'
import ManageOrdersClient from './ManageOrdersClient';
import getOrders from '@/src/actions/getOrders';
import getCurrentUser from '@/src/actions/getCurrentUser';
import NullData from '@/src/components/NullData';
import Container from '@/src/components/Container';

const ManageOrders = async () => {
  const orders = await getOrders();
  const currentUser = await getCurrentUser(true);

  if(!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Access denied" />
  }


  return (
    <Container>
      <ManageOrdersClient orders={orders} />
    </Container>
  )
}

export default ManageOrders
