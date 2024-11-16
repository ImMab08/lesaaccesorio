import React, { useState } from "react";

import { crear } from "@/utils/crear";
import { IconUpload } from "@/icons";
import useModalStore from "@/hook/storeOpenModals";
import { useFetch } from "@/hook/useFetch";

export default function CreateProducto({ productos, setData }) {
  const { closeModal } = useModalStore();

  const { data: articulos } = useFetch( "/v01/articulo/usuario");
  console.log("articulos: ", articulos)

  // Estados inicializados con valores adecuados.
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [imagen, setImagen] = useState("");

  const [id_articulo, setId_articulo] = useState();

  const [error, setError] = useState("");

  // Función para el envío del formulario.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await crear("/v01/producto/create", { nombre, descripcion, precio, stock, imagen, id_articulo });
    console.log("response producto", response)

    setData([
      ...productos,
      {
        ...response,
        id_articulo,
        nombreArticulo: articulos.find(
          (articulo) => articulo.id === Number(id_articulo)
        )?.nombre,
      }
    ]);

    closeModal();
  };

  return (
    <div className="w-full text-title h-full top-0 left-0 bg-black/70 bg-opacity-60 fixed z-50 flex ">
      <div className="bg-secondary overflow-auto">
        <div className="flex flex-col space-y-1.5 p-5">
          <h3 className="text-xl font-semibold text-center">Añade un nuevo producto</h3>
        </div>

        <div className="px-6 over">
          <div className="w-full h-auto overflow-auto">
            <form onSubmit={handleSubmit} action="" className="p-2 space-y-4">
              <div className="flex flex-col space-y-2">
                <label className="font-semibold" htmlFor="Articulo">Articulo</label>
                <select
                  className="py-2 px-3 bg-primary rounded-lg cursor-pointer focus:outline-none"
                  onChange={(e) => setId_articulo(e.target.value)}
                  value={id_articulo}
                  id="articulo"
                  name="articulo"
                >
                  <option className="py-2 px-4 bg-primary" value="">Selecciona una Articulo</option>
                  {articulos.map((articulo) => (
                    <option
                      className="py-2 px-4 bg-primary"
                      value={articulo.id}
                      key={articulo.id}
                    >
                      {articulo?.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-title font-semibold" htmlFor="">Nombre</label>
                <input
                  className="flex border px-3 py-2 text-sm text-title bg-primary w-[300px] border-border rounded-lg focus:outline-none"
                  onChange={(e) => setNombre(e.target.value)}
                  value={nombre}
                  type="text"
                  required
                />
              </div>

              <div className="flex  space-x-5">
                <div className="flex flex-col space-y-2">
                  <label className="text-title font-semibold" htmlFor="">Precio</label>
                  <input
                    className="flex border px-3 py-2 text-sm text-title bg-primary w-[140px] border-border rounded-lg focus:outline-none"
                    onChange={(e) => setPrecio(e.target.value)}
                    value={precio}
                    type="text"
                    required
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="text-title font-semibold" htmlFor="">Cantidad</label>
                  <input
                    className="flex border px-3 py-2 text-sm text-title bg-primary w-[140px] border-border rounded-lg focus:outline-none"
                    onChange={(e) => setStock(e.target.value)}
                    value={stock}
                    type="text"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-title font-semibold" htmlFor="">Descripción</label>
                <textarea
                  className="flex border px-3 py-2 text-sm text-title bg-primary w-[300px] border-border rounded-lg focus:outline-none"
                  onChange={(e) => setDescripcion(e.target.value)}
                  value={descripcion}
                  required
                  cols="50"
                  rows="4"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-title font-semibold" htmlFor="">Imagen</label>
                <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed rounded-md space-y-4 cursor-pointer">
                  <IconUpload />
                  <p className="text-subtitle text-sm w-[180px] text-center">Selecciona o arraste la imagen de tu producto</p>
                </div>
              </div>

              <div className="flex items-center justify-center p-4 relative space-x-10">
                <button onClick={closeModal} className="flex items-center justify-center text-sm font-medium text-white h-9 bg-red-500 hover:bg-red-500/80 rounded-md px-3 gap-1">Cancelar</button>
                <button type="submit" className="flex items-center justify-center text-sm font-medium text-white h-9 bg-green-500 hover:bg-green-500/80 rounded-md px-4 gap-1">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
