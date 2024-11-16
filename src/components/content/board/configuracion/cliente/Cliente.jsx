'use client'
import React, { useState } from 'react'

import { useFetch } from '@/hook/useFetch';
import useModalStore from '@/hook/storeOpenModals';

import CreateCliente from '@/components/content/modals/cliente/CreateCliente';
import DeleteCliente from '@/components/content/modals/cliente/DeleteCliente';
import UpdateCliente from '@/components/content/modals/cliente/UpdateCliente';

import { IconArrowDown, IconPapelera, IconPencil, IconSearch, IconDefaultClient } from '@/icons'

export default function Cliente() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCliente, setSelectedCliente] = useState(null);

  const { modals, openModal } = useModalStore();
  const { data: clientes, setData } = useFetch("/v01/cliente/usuario");
  console.log("datos", clientes);

  const handleOpenModal = () => {
    setOpen(!open)
  }

  // Función para editar un cliente
  const handleOpenModalEdit = (cliente) => {
    setSelectedCliente(cliente);
    openModal("EditarProducto");
  };

  // Función para eliminar un cliente
  const handleOpenModalDelete = (cliente) => {
    setSelectedCliente(cliente);
    openModal("EliminarProducto");
  };

  // Filtrar clientes solo por el nombre
  const filteredClientes = clientes.filter((cliente) =>
    cliente?.nombre && cliente.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="w-full h-full flex flex-col text-secondary overflow-auto">
      <div className="w-full h-auto bg-primary rounded-lg p-5 space-y-5">
        <div className="flex cursor-pointer" onClick={handleOpenModal}>
          <h1 className="flex-1 text-xl font-semibold text-title">
            Configuración de Clientes
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
            <div className="rounded-lg border-border border">
              <div className="flex items-center p-6 ">
                <div className="flex flex-col space-y-1.5">
                  <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight text-title">Clientes</h3>
                  <p className="text-sm text-muted-foreground text-title">Administra tus clientes.</p>
                </div>

                <div className="relative ml-auto flex-1 md:grow-0 bg-secondary rounded-lg">
                  <div className="absolute left-2 top-2">
                    <IconSearch />
                  </div>
                  <input
                    className=" w-full outline-none focus:border-none rounded-4 flex bg-transparent text-title h-10 px-3 py-2 text-sm pl-10 md:w-[200px] lg:w-[336px]"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar"
                    type="search"
                  />
                </div>

                <div className="flex items-center justify-center p-4 relative">
                  <button
                    className="flex items-center justify-center text-sm font-medium text-white h-9 bg-green-500 hover:bg-green-500/80 rounded-md px-3 gap-1"
                    onClick={() => openModal("CreateProducto")}
                  >
                    Crear cliente
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="relative w-full h-[400px] overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="">
                      <tr className="border-b border-border transition-colors hover:bg-muted/50">
                        <th className="h-12 px-4 text-left align-middle font-bold text-title">Imagen</th>
                        <th className="h-12 px-4 text-left align-middle font-bold text-title">Nombre</th>
                        <th className="h-12 px-4 text-left align-middle font-bold text-title">Apellido</th>
                        <th className="h-12 px-4 text-left align-middle font-bold text-title">Correo Eléctronico</th>
                        <th className="h-12 px-4 text-left align-middle font-bold text-title">Dirección</th>
                        <th className="h-12 px-4 text-left align-middle font-bold text-title">Teléfono</th>
                        <th className="h-12 px-4 text-left align-middle font-bold text-title">Opciones</th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {filteredClientes.length > 0 ? (
                        filteredClientes.map((cliente) => (
                          <tr
                            key={cliente?.nombre}
                            className="border-b border-border"
                          >
                            <td className="p-4 align-middle text-subtitle font-semibold">
                              <IconDefaultClient />
                            </td>
                            <td className="p-4 align-middle text-subtitle font-semibold">
                              {cliente?.nombre}
                            </td>
                            <td className="p-4 align-middle text-subtitle font-semibold">
                              {cliente?.apellido}
                            </td>
                            <td className="p-4 align-middle text-subtitle font-semibold">
                              {cliente?.cliente_email}
                            </td>
                            <td className="p-4 align-middle text-subtitle font-semibold">
                              {cliente?.cliente_direccion}
                            </td>
                            <td className="p-4 align-middle text-subtitle font-semibold">
                              {cliente?.telefono}
                            </td>

                            <td className="p-4 align-middle space-x-2">
                              <button
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium disabled:opacity-50 bg-blue-500 hover:bg-blue-500/80 h-7 w-7"
                                onClick={() => handleOpenModalEdit(cliente)}
                              >
                                <IconPencil width={20} height={20} />
                              </button>

                              <button
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium disabled:opacity-50 bg-red-500 hover:bg-red-500/80 h-7 w-7"
                                onClick={() => handleOpenModalDelete(cliente)}
                              >
                                <IconPapelera width={20} height={20} />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr className="h-[200px]">
                          <td colSpan="8" className="text-center text-title font-semibold p-4">No hay clientes agregados</td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  {modals.CreateProducto && <CreateCliente clientes={clientes} setData={setData} />}
                  {modals.EditarProducto && <UpdateCliente cliente={selectedCliente} setData={setData} />}
                  {modals.EliminarProducto && <DeleteCliente cliente={selectedCliente} setData={setData} />}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
