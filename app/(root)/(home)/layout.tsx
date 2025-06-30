import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import React from 'react'

export default function HomeLayout ({children}: {children: React.ReactNode}){
  return (
        <main className='relative'>
            <Navbar/>
            <div className="flex">
                <Sidebar/> 
                <section className='flex min-h-screen bg-gray-500 flex-1 flex-col px-6 pb-6 mx-md:pb14 sm:px-14'>
                   <div className="w-full">
                   {children}
                   </div>
                </section>
            </div>
        </main>
  )
}

