import {cache} from 'react';
import { getServerSession } from "next-auth";
import { prisma } from "../libs/prismadb";
import { authOptions } from '../app/api/auth/[...nextauth]/authOptions';
import { SafeUser } from '../types/types';
import { Order } from '@prisma/client';

export async function getSessionData() {
    const session = getServerSession(authOptions);
    return Promise.resolve(session);
}

const getCurrentUserCached = cache(async (email: string | null | undefined, includeOrders: boolean = false): Promise<SafeUser & {orders: Order[]} | null> => {
    try {

        if(!email) {
            return null;
        }

        const currentUser = await prisma?.user.findUnique({
            where: {
                email: email as string,
            },
            include: {
                orders: includeOrders,
            },
        });

        if(!currentUser) {
            return null;
        }

        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null,
        };
        // return {
        //     ...session?.user,
        //     ...session?.userData,
        // } as User;

    } catch (error: any) {
        console.log(error.message);
        return null;
    }
});


// Main getCurrentUser function that combines both
export default async function getCurrentUser(includeOrders: boolean = false) {
    const session = await getSessionData();
    return getCurrentUserCached(session?.user?.email, includeOrders);
}
