"use client"
import React from 'react'
import Link from 'next/link'
import { MdDashboard, MdDns, MdFormatListBulleted, MdLibraryAdd } from 'react-icons/md'
import { usePathname } from 'next/navigation'
import Container from '../Container'
import AdminNavItem from './AdminNavItem'

const AdminNav = () => {
    let pathname = usePathname();
    // remove / if strings ends with /
    pathname = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
    return (
        <div className="w-full shadow-sm top-20 border-b-[1px] pt-4">
            <Container>
                <div className="flex flex-row items-center justify-center md:justify-between gap-8 md:gap-12 overflow-x-auto flex-nowrap">
                    <Link href='/admin'>
                        <AdminNavItem label="Summary" icon={MdDashboard} selected={pathname === "/admin"} />
                    </Link>
                    <Link href='/admin/add-products'>
                        <AdminNavItem label="AddProducts" icon={MdLibraryAdd} selected={pathname === "/admin/add-products"} />
                    </Link>
                    <Link href='/admin/manage-products'>
                        <AdminNavItem label="ManageProducts" icon={MdDns} selected={pathname === "/admin/manage-products"} />
                    </Link>
                    <Link href='/admin/manage-orders'>
                        <AdminNavItem label="ManageOrders" icon={MdFormatListBulleted} selected={pathname === "/admin/manage-orders"} />
                    </Link>
                </div>
            </Container>
        </div>
    )
}

export default AdminNav
