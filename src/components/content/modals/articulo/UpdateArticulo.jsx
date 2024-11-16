import React, { useState } from "react";

import { editar } from "@/utils/editar";
import useModalStore from "@/hook/storeOpenModals";

export default function UpdateArticulo({ articulo, setData }) {
  const { closeModal } = useModalStore();

  console.log("articulo update", articulo)

  // Estados locales para actualizar los datos de la articulo seleccionada.
  const [ nombre, setNombre ] = useState(articulo?.nombre);
  const [ descripcion, setDescripcion ] = useState(articulo?.descripcion);
  const [ error, setError ] = useState("");

  // Función para manejar la edición de la articulo.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!nombre) {
      setError("Tienes que ponerle un nombre a la categoría.");
      return;
    }

    await editar(`/v01/articulo/update/${articulo.id}`, { nombre, descripcion });
    setData((prev) => 
      prev.map((item) => item.id === articulo.id ? { nombre, descripcion } : item)
    );

    closeModal();
  };

  return (
    <div className="w-full h-full top-0 left-0 bg-black/70 bg-opacity-60 fixed z-50 flex items-center justify-center">
      <div className="rounded-lg bg-secondary">
        <div className="flex flex-col space-y-1.5 p-5">
          <h3 className="text-xl font-semibold text-center">Actualizar Artículo</h3>
        </div>

        <div className="px-6">
          <div className="w-full h-[270px] overflow-auto">
            <form onSubmit={handleSubmit} className="p-2 space-y-4">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="nombre">Nombre</label>
                <input
                  required
                  type="text"
                  value={nombre}
                  placeholder="Añade un nombre al artículo"
                  onChange={(e) => setNombre(e.target.value)}
                  className="flex px-3 py-2 text-sm text-title bg-primary min-w-72 rounded-lg focus:outline-none"
                />
              </div>

              {error && <p className=" text-red-500 text-sm">{error}</p>}

              <div className="flex flex-col space-y-1.5">
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                  rows="4"
                  required
                  value={descripcion}
                  placeholder="Añade una descripción corta"
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="flex px-3 py-2 text-sm text-title bg-primary w-auto rounded-lg focus:outline-none"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="flex items-center justify-center p-4 relative space-x-10">
          <button onClick={() => closeModal("Editararticulo")} className="flex items-center justify-center text-sm font-medium text-white h-9 bg-red-500 hover:bg-red-500/80 rounded-md px-3">Cancelar</button>
          <button onClick={handleSubmit} className="flex items-center justify-center text-sm font-medium text-white h-9 bg-green-500 hover:bg-green-500/80 rounded-md px-4">Actualizar</button>
        </div>
      </div>
    </div>
  );
}