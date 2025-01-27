import { prisma } from "@/src/libs/prismadb";

export default async function getOrdersByUserId(userId: string) {
    try {
        const Orders = await prisma.order.findMany({
            include: {
                user: true
            },
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                userId: userId
            }
        })

        return Orders;
    } catch (error: any) {
        console.log(error.message);
        throw new Error("Error fetching orders");
    }
}