
import getCurrentUser from "@/src/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { prisma } from "@/src/libs/prismadb";

export async function PUT(request: Request) {
    const currentUser = await getCurrentUser();

    if(!currentUser || currentUser.role !== 'ADMIN') {
        return NextResponse.error();
    }

    const body = await request.json();
    const { id, deliveryStatus } = body;
    const order = await prisma.order.update({
        where: {
            id: id,
        },
        data: {
            deliveryStatus
        },
    });

    return NextResponse.json(order);
}
