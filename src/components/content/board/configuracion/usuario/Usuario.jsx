"use client";
import React, { useState } from "react";

import { useFetch } from "@/hook/useFetch";
import useModalStore from "@/hook/storeOpenModals";

import UpdateUsuario from "@/components/content/modals/usuario/UpdateUsuario";
import { IconArrowDown, IconPencil } from "@/icons";

export default function Usuario() {
  const [open, setOpen] = useState(false);
  const { modals, openModal } = useModalStore();
  const { data: usuarios, setData } = useFetch("/v01/usuario/info");
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  console.log("usuarios: ", usuarios);

  const handleOpenModal = () => {
    setOpen(!open);
  };

  // Función para editar un cliente
  const handleOpenModalEdit = (cliente) => {
    setSelectedUsuario(cliente);
    openModal("EditarProducto");
  };

  return (
    <section className="w-full h-full flex flex-col text-secondary overflow-auto">
      <div className="w-full h-auto bg-primary rounded-lg p-5 space-y-5">
        <div className="flex cursor-pointer" onClick={handleOpenModal}>
          <h1 className="flex-1 text-xl font-semibold text-title">
            Información del Usuario
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
                  <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight text-title">
                    Usuario
                  </h3>
                  <p className="text-sm text-muted-foreground text-title">
                    Administra tu información personal
                  </p>
                </div>
              </div>

              <div className="p-6">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="">
                      <tr className="border-b border-border transition-colors hover:bg-muted/50">
                        <th className="h-12 px-4 text-left align-middle font-bold text-title">
                          Nombre
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-bold text-title">
                          Apellido
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-bold text-title">
                          Correo Eléctronico
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-bold text-title">
                          Opciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {usuarios ? (
                        <tr
                          key={usuarios.id_usuario}
                          className="border-b border-border"
                        >
                          <td className="p-4 align-middle text-subtitle font-semibold">
                            {usuarios.nombre}
                          </td>
                          <td className="p-4 align-middle text-subtitle font-semibold">
                            {usuarios.apellido}
                          </td>
                          <td className="p-4 align-middle text-subtitle font-semibold">
                            {usuarios.email}
                          </td>
                          <td className="p-4 align-middle space-x-2">
                            <button
                              className="inline-flex items-center justify-center rounded-md text-sm font-medium disabled:opacity-50 bg-blue-500 hover:bg-blue-500/80 h-7 w-7"
                              onClick={() => handleOpenModalEdit(usuarios)}
                            >
                              <IconPencil width={20} height={20} />
                            </button>
                          </td>
                        </tr>
                      ) : (
                        <tr className="">
                          <td
                            colSpan="8"
                            className="text-center text-title font-semibold p-4"
                          >
                            No hay información del usuario
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  {modals.EditarProducto && <UpdateUsuario usuario={selectedUsuario} setData={setData} />}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
