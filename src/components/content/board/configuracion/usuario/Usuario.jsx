'use client'
import React, { useEffect, useState } from 'react'

import { useFetch } from '@/hook/useFetch';
import useModalStore from '@/hook/storeOpenModals';

import { IconArrowDown, IconPapelera, IconPencil, IconDefaultProduct, IconSearch } from '@/icons'

export default function Usuario() {
  const [open, setOpen] = useState(false);
  const { modals, openModal } = useModalStore();
  const { data: usuario, setData } = useFetch("/v01/usuario/info");

  const handleOpenModal = () => {
    setOpen(!open)
  }

  return (
    <section className="w-full h-full flex flex-col text-secondary overflow-auto">
      <div className="w-full h-auto bg-primary rounded-lg p-5 space-y-5">
        <div className="flex cursor-pointer" onClick={handleOpenModal}>
          <h1 className="flex-1 text-xl font-semibold text-title">
            Configuración del Usuario
          </h1>
          <div
            className={`cursor-pointer transform transition-transform duration-300 ${
              handleOpenModal ? "rotate-0" : "-rotate-180"
            }`}
          >
            <IconArrowDown width={32} height={32} />
          </div>
        </div>

        {open && (
          <div className="w-full h-auto bg-primary rounded-lg">
            <p>{usuario?.nomre}</p>
            <p>{usuario?.email}</p>
          </div>
        )}
      </div>
    </section>
  )
}
