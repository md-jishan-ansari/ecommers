
import getCurrentUser from '@/src/actions/getCurrentUser';
import OrderClient from './OrderClient';
import NullData from '@/src/components/NullData';
import getOrdersByUserId from '@/src/actions/getOrdersByUserId';
import Container from '@/src/components/Container';

const Orders = async () => {
  const currentUser = await getCurrentUser();


  if(!currentUser) {
    return <NullData title="Oops! Access denied" />
  }

  const orders = await getOrdersByUserId(currentUser.id);

  if(!orders) {
    return <NullData title="No orders yet..." />
  }


  return (
    <Container>

        <OrderClient orders={orders} />
    </Container>
  )
}

export default Orders
