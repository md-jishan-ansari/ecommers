import { prisma } from "@/src/libs/prismadb";

export interface IProductParams {
    category?: string | null;
    searchTerm?: string | null;
}

export default async function getProducts(params: IProductParams) {
    try {
        const {category=null, searchTerm=null} = params;
        let searchString = searchTerm;

        if(!searchString) {
            searchString = "";
        }

        const query: any = {};

        if(category) {
            query.category = category;
        }

        const products = await prisma.product.findMany({
            where: {
                ...query,
                OR: [
                    {
                        name: {
                            contains: searchString,
                            mode: 'insensitive'
                        },
                        description: {
                            contains: searchString,
                            mode: 'insensitive'
                        }
                    }
                ]
            },
            include: {
                reviews: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        createdAt: 'desc',
                    }
                }
            }
        })

        return products;

    } catch (error: any) {
        throw new Error(`Something went wrong ${error.message}`);
    }
}