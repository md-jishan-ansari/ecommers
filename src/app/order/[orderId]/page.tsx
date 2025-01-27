import getOrderById from "@/src/actions/getOrderById";
import OrderDetails from "./OrderDetails";
import Container from "@/src/components/Container";
import NullData from "@/src/components/NullData";

interface IParams {
    orderId?: string
}

const Order = async ({params} : {params: IParams}) => {

    const order = await getOrderById(params);

    if(!order) return <NullData title="No order" />

    return <div className="p-8">
        <Container>
            <OrderDetails order={order} />
        </Container>
    </div>;
}

export default Order;