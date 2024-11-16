import React from 'react'

import Usuario from './usuario/Usuario'
import Producto from './producto/Producto'
import { SettingsArticulo } from './articulo'
import Cliente from './cliente/Cliente'

export default function Configuracion() {
  return (
    <section className='w-full h-full'>
      <div className='bg-white p-5 fixed z-50 w-full shadow-md'>
        <h2 className='text-2xl font-bold'>Configuracion</h2>
      </div>
      <div className='flex-1 p-5 space-y-5 pt-24'>
        <Usuario />
        <SettingsArticulo />
        <Producto />
        <Cliente />
      </div>
    </section>
  )
}
