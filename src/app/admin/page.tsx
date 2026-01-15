import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import AdminDashBoardClient from './AdminDashBoardClient'

 async function AdminPage() {
   const user = await currentUser()

   //user is not logged in 
    if (!user) redirect("/")
    
        const adminEmail = process.env.ADMIN_EMAIL;
        const userEmail = user.emailAddresses[0]?.emailAddress;

    //user is not the admin
    if (!adminEmail || userEmail !== adminEmail) redirect("/dashboard")

   return <AdminDashBoardClient/>
 }
 
 export default AdminPage
 