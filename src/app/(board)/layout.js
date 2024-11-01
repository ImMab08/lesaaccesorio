import Dashboard from '@/components/content/dashboard/Dashboard'
import React from 'react'

export default function Layout({ children }) {
  return (
    <main className='w-full h-full flex'>
      <section className='flex w-auto h-full shadow-2xl'>
        <Dashboard />
      </section>
      <section className='flex flex-col w-full h-screen overflow-hidden p-5 bg-gray-200'>
        {children}
      </section>
    </main>
  )
}
