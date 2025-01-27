import { prisma } from "@/src/libs/prismadb";

export default async function getOrders() {
    try {
        const Orders = await prisma.order.findMany({
            include: {
                user: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return Orders;
    } catch (error: any) {
        throw new Error(`Error fetching orders: ${error.message}`);
    }
}