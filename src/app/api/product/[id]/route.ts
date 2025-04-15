import getCurrentUser from "@/src/actions/getCurrentUser";
import { prisma } from "@/src/libs/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, {params}: {params: {id: string}}) {
    const currentUser = await getCurrentUser();

    if(!currentUser || currentUser.role !== 'ADMIN') {
        return NextResponse.error();
    }

    try {
        // First get the product to access its images
        const product = await prisma.product.findUnique({
            where: {
                id: params.id,
            }
        });

        if (!product) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        // Delete images from CDN
        if (product.images && product.images.length > 0) {
            const imageUrls = product.images.map((img: any) => img.image);
            await fetch(`${process.env.STATIC_CDN_URL}/api/image/delete-image`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${process.env.PROJECT_API_KEY}`
                },
                body: JSON.stringify({ imageUrls }),
            });
        }

        // Delete the product from database
        await prisma.product.delete({
            where: {
                id: params.id,
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json(
            { error: 'Error deleting product' },
            { status: 500 }
        );
    }
}