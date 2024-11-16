'use client'
import React, { useState } from "react";

import { useFetch } from "@/hook/useFetch";
import useModalStore from "@/hook/storeOpenModals";

import CreateArticulo from "@/components/content/modals/articulo/CreateArticulo";
import UpdateArticulo from "@/components/content/modals/articulo/UpdateArticulo";
import DeleteArticulo from "@/components/content/modals/articulo/DeleteArticulo";

import { IconPapelera, IconPencil } from "@/icons";

export default function Articulo() {
  const { modals, openModal } = useModalStore();
  const { data: articulos, setData } = useFetch( "/v01/articulo/usuario");

  // Estado para almacenar la categoria seleccionada.
  const [selectCategoria, setSelectCategoria] = useState(null);

  // función para editar una categoria;
  const handleOpenModalEdit = (categoria) => {
    setSelectCategoria(categoria);
    openModal("EditarArticulo");
  };

  // función para eliminar una subcategoria;
  const handleOpenModalDelete = (categoria) => {
    setSelectCategoria(categoria);
    openModal("EliminarArticulo");
  };

  return (
    <div className="max-w-full rounded-lg border border-border">
      <div className="flex flex-col space-y-1.5 p-4 md:p-5">
        <h3 className="text-base md:text-lg font-semibold leading-none text-title">Articulos</h3>
        <p className="text-xs md:text-sm border-b-2 border-border pb-3 text-title">Gestona los articulos.</p>
      </div>

      <div className="md:px-6">
        <div className="md:w-full h-[310px] overflow-auto">
          <table className="md:w-full">
            <thead className="sticky top-0">
              <tr className="border-b border-border bg-primary">
                <th className="h-12 px-4 text-sm md:text-base text-left align-middle font-bold text-title">Nombre</th>
                <th className="h-12 px-4 text-sm md:text-base text-left align-middle font-bold text-title">Descripción</th>
                <th className="h-12 px-4 text-sm md:text-base text-left align-middle font-bold text-title">Opciones</th>
              </tr>
            </thead>
            <tbody className="">
              {articulos && articulos.length > 0 ? (
                articulos.map((articulo) => (
                  <tr key={articulo.id} className="border-b border-border">
                    <td className="p-4 text-xs md:text-sm align-middle text-subtitle">{articulo.nombre}</td>
                    <td className="p-4 text-xs md:text-sm align-middle text-subtitle">{articulo.descripcion}</td>

                    <td className="p-4 align-middle space-x-2">
                      <button className="inline-flex items-center justify-center rounded-md bg-blue-500 hover:bg-blue-500/80 w-6 h-6 md:w-7 md:h-7" onClick={() => handleOpenModalEdit(articulo)}>
                        <IconPencil className="hidden md:block" width="18px" height="18px" />
                        <IconPencil className="block md:hidden" width="14px" height="14px" />
                      </button>
                      <button className="inline-flex items-center justify-center rounded-md bg-red-500 hover:bg-red-500/80 w-6 h-6 md:w-7 md:h-7" onClick={() => handleOpenModalDelete(articulo)}>
                        <IconPapelera className="hidden md:block" width="18px" height="18px" />
                        <IconPapelera className="block md:hidden" width="14px" height="14px" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center p-4">No hay articulos creadas</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-center p-4 relative">
        <button className="flex items-center justify-center text-sm font-medium text-white h-9 bg-green-500 hover:bg-green-500/80 rounded-md px-4" onClick={() => openModal("CreateArticulo")}>Añadir Articulo</button>

        {modals.CreateArticulo && (<CreateArticulo articulos={articulos} setData={setData} />)}
        {modals.EditarArticulo && (<UpdateArticulo articulo={selectCategoria} setData={setData}/>)}
        {modals.EliminarArticulo && (<DeleteArticulo articulo={selectCategoria} setData={setData}/>)}
      </div>
    </div>
  );
}
