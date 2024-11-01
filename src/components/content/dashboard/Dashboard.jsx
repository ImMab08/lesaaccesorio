import React from 'react'
import { itemLogout, items } from './config'
import Link from 'next/link'

export default function Dashboard() {

  const menu = items.map(({ url, texto, icon }) => {
    return (
      <div key={texto} className=''>
        <Link href={url} >{icon}</Link>
      </div>
    )
  })

  const logout = itemLogout.map(({ url, texto, icon }) => {
    return (
      <div key={texto}>
        <Link href={url}>{icon}</Link>
      </div>
    )
  })

  return (
    <div className='flex flex-col justify-between'>
      <div className='w-full h-full p-4 space-y-5'>
        {menu}
      </div>

      <div className='p-4'>
        {logout}
      </div>
    </div>
  )
}
