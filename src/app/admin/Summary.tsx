'use client'

import { formatNumber } from "@/src/utils/formatNumber";
import { formatPrice } from "@/src/utils/formatPrice";
import { Order, Product, User } from "@prisma/client";
import { useEffect, useState } from "react";

interface SummaryProps {
    orders: Order[];
    products: Product[];
    users: User[];
}

type SummaryDataType = {
    [key: string]: {
        label: string;
        digit: number;
    }
}

const Summary:React.FC<SummaryProps> = ({orders, products, users}) => {
    const [summaryData, setSummaryData] = useState<SummaryDataType>({
        sale: {
            label: 'Total Sale',
            digit: 0
        },
        products: {
            label: 'Total Products',
            digit: 0
        },
        orders: {
            label: 'Total Orders',
            digit: 0
        },
        paidOrders: {
            label: 'Paid Orders',
            digit: 0
        },
        unpaidOrders: {
            label: 'Unpaid Orders',
            digit: 0
        },
        users: {
            label: 'Total Users',
            digit: 0
        }
    });

    useEffect(() => {
        setSummaryData((prev) => {
            const tempData = {...prev};

            const totalSail = orders.reduce((acc, order) => {
                if(order.status === 'complete') {
                    return acc + order.amount
                }
                return acc;
            }, 0);

            const paidOrders = orders.filter((order) => order.status === 'complete');
            const unpaidOrders = orders.filter((order) => order.status === 'pending');

            tempData.sale.digit = totalSail;
            tempData.orders.digit = orders.length;
            tempData.paidOrders.digit = paidOrders.length;
            tempData.unpaidOrders.digit = unpaidOrders.length;
            tempData.products.digit = products.length;
            tempData.users.digit = users.length;

            return tempData;
        })
    }, [orders, products, users]);

    const summaryKeys = Object.keys(summaryData);

    return (
        <div className="max-w-[1150px] m-auto">
            <div className="mb-4 mt-8">
                <h3 className="text-slate-800 dark:text-white text-3xl text-center font-semibold mb-2">Stats</h3>
            </div>
            <div className="grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto">
                {summaryKeys && summaryKeys.map((key) => (
                    <div key={key} className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition">
                        <div className="text-xl md:text-4xl font-bold">
                            {summaryData[key].label === 'Total Sale' ? formatPrice(summaryData[key].digit / 100) : formatNumber(summaryData[key].digit)}
                        </div>
                        <div>{summaryData[key].label}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Summary
