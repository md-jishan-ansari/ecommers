
import getGraphData from '@/src/actions/getGraphData';
import getOrders from '@/src/actions/getOrders';
import getProducts from '@/src/actions/getProducts';
import getUsers from '@/src/actions/getUsers';
import Container from '@/src/components/Container';
import React from 'react'
import Summary from './Summary';
import BarGraph from './BarGraph';

const Admin = async () => {
  const products = await getProducts({category: null})
  const orders = await getOrders();
  const users = await getUsers()
  const graphData = await getGraphData()

  return (
    <div className="py-8">
      <Container>
        <Summary products={products} orders={orders} users={users} />
        <div className="mt-4 mx-auto max-w-[1150px]">
          <BarGraph data={graphData} />
        </div>
      </Container>
    </div>
  )
}

export default Admin