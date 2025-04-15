'use client'

import ActionBtn from '@/src/components/ActionBtn';
import Status from '@/src/components/Status';
import { formatPrice } from '@/src/utils/formatPrice';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Product } from "@prisma/client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { MdCached, MdClose, MdDelete, MdDone, MdRemoveRedEye } from "react-icons/md";
import { toast } from 'react-toastify';

interface ManageProductsClientProps {
  products: Product[]
}

const ManageProductsClient:React.FC<ManageProductsClientProps> = ({products}) => {
    const router = useRouter();

    let rows: any = [];

    if (products) {
        rows = products.map((product) => {
            return {
                id: product.id,
                name: product.name,
                price: formatPrice(product.price),
                category: product.category,
                brand: product.brand,
                inStock: product.inStock,
                images: product.images,
            }
        });
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 220 },
        { field: 'name', headerName: 'Name', width: 220},
        {
            field: 'price',
            headerName: 'Price(USD)',
            width: 100,
            renderCell: (params) => {
                return (<div className="font-bold text-slate-800">{params.row.price}</div>);
            }
        },
        { field: 'category', headerName: 'Category', width: 100 },
        { field: 'brand', headerName: 'Brand', width: 100 },
        {
            field: 'inStock',
            headerName: 'In Stock',
            width: 120,
            renderCell: (params) => {
                return (<div className="h-full flex">
                                {params.row.inStock === true ? (
                                    <Status text="In stock" icon={MdDone} bg="bg-teal-200" color="text-teal-700" />
                                ) : (
                                    <Status text="Out of stock" icon={MdClose} bg="bg-rose-200" color="text-rose-700" />
                                )}
                        </div>);
            }
        },
        {
            field: 'action',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => {
                return (<div className="flex justify-between items-center gap-4 w-full h-full">
                            <ActionBtn icon={MdCached} onClick={() => {
                                handleToggleStock(params.row.id, params.row.inStock);
                            }} />
                            <ActionBtn icon={MdDelete} onClick={() => {
                                handleDelete(params.row.id, params.row.images);
                            }} />
                            <ActionBtn icon={MdRemoveRedEye} onClick={() => {
                                router.push(`/product/${params.row.id}`);
                            }} />
                        </div>);
            }
        },
    ];

    const handleToggleStock = useCallback((id: string, inStock: boolean) => {
        axios.put('/api/product', {
            id,
            inStock: !inStock
        }).then(() => {
            toast.success('Product status changed');
            router.refresh();
        }).catch((error) => {
            toast.error(error.message);
        });
    }, [router]);

    const handleDelete = useCallback( async (id: string, images: any[]) => {
        toast('Deleting product, please wait...');

        const handleImageDelete = async () => {
            try {
                const imageUrls = images.map(image => image.image);
                await axios.delete('/api/product/image', {
                    data: {
                        imageUrls: imageUrls
                    }
                });
            } catch (error) {
                console.error('Error deleting images:', error);
                throw error; // Re-throw to prevent product deletion if image deletion fails
            }
        }

        await handleImageDelete();

        axios.delete(`/api/product/${id}`).then(() => {
            toast.success('Product deleted');
            router.refresh();
        }).catch((error) => {
            toast.error(error.message);
        });
    }, [router]);


    return (
        <div className="max-w-[1150px] m-auto text-xl">
            <div className="mb-4 mt-8">
                <h3 className="text-slate-800 dark:text-white text-3xl text-center font-semibold mb-2">Manage Products</h3>
            </div>
            <div style={{height: 600, width: '100%'}} className="*:dark:text-white">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 }
                        }
                    }}
                    pageSizeOptions={[5, 10, 15]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </div>
        </div>
    )
}

export default ManageProductsClient
