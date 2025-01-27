import React from 'react'
import AdminNav from '../../components/admin/AdminNav'
import getCurrentUser from '@/src/actions/getCurrentUser'
import NullData from '@/src/components/NullData'

export const metadata = {
    title: 'E-Shop Admin',
    description: "E-Shop Admin Dashboard",
}

const AdminLayout = async ({children}: {children: React.ReactNode}) => {
  const currentUser = await getCurrentUser();

  console.log({currentUser});

  if(currentUser?.role != 'ADMIN') {
    return <NullData title="You are not authorized to view this page" />
  }
  return (
    <div>
        <AdminNav />
        {children}
    </div>
  )
}

export default AdminLayout
