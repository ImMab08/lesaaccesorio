import React, { useState } from "react";

import { editar } from "@/utils/editar";
import { IconUpload } from "@/icons";

import useModalStore from "@/hook/storeOpenModals";
import { useFetch } from "@/hook/useFetch";

export default function UpdateProducto({ producto, setData }) {
  const { closeModal } = useModalStore();

  const { data: articulos } = useFetch("/v01/articulo/usuario");

  // Estados para el formulario.
  const [nombre, setNombre] = useState(producto.nombre);
  const [descripcion, setDescripcion] = useState(producto.descripcion);
  const [precio, setPrecio] = useState(producto.precio);
  const [stock, setStock] = useState(producto.stock);
  const [imagen, setImagen] = useState(producto.imagen);
  const [id_articulo, setId_articulo] = useState(producto.id_articulo);

  // Función para el envío del formulario.
  const handleSubmit = async (e) => {
    e.preventDefault();
    await editar(`/v01/producto/update/${producto.id_producto}`, {
      nombre,
      descripcion,
      precio,
      stock,
      imagen,
      id_articulo,
    });

    setData((prev) =>
      prev.map((item) =>
        item.id_producto === producto.id_producto
          ? {
              ...item,
              nombre,
              descripcion,
              precio,
              stock,
              imagen,
              id_articulo,
              nombreArticulo: articulos.find(
                (articulo) => articulo.id === Number(id_articulo)
              )?.nombre,
            }
          : item
      )
    );

    closeModal();
  };

  return (
    <div className="w-full h-full text-white top-0 left-0 bg-black/70 bg-opacity-60 fixed z-50 flex ">
      <div className="bg-secondary overflow-auto">
        <div className="flex flex-col space-y-1.5 p-5">
          <h3 className="text-xl text-title font-semibold text-center">
            Actualizar el producto{" "}
          </h3>
          <span className="text-xl text-title font-bold text-center">
            {producto?.nombre}
          </span>
        </div>

        <div className="px-6 over">
          <div className="text-title w-full h-auto overflow-auto">
            <form action="" className="p-2 space-y-4">
              <div className="flex flex-col space-y-2">
                <label className="font-semibold" htmlFor="Articulo">
                  Articulo
                </label>
                <select
                  className="py-2 px-3 bg-primary rounded-lg cursor-pointer focus:outline-none"
                  onChange={(e) => setId_articulo(e.target.value)}
                  value={id_articulo}
                  id="articulo"
                  name="articulo"
                >
                  <option className="py-2 px-4 bg-primary" value="">
                    Selecciona una Articulo
                  </option>
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
                <label className="text-title font-semibold" htmlFor="">
                  Nombre
                </label>
                <input
                  className="flex border px-3 py-2 text-sm text-title bg-primary w-[300px] border-border rounded-lg"
                  placeholder="Salchipapa Vegana Personal"
                  type="search"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>

              <div className="flex  space-x-5">
                <div className="flex flex-col space-y-2">
                  <label className="text-title font-semibold" htmlFor="">
                    Precio
                  </label>
                  <input
                    className="flex border px-3 py-2 text-sm text-title bg-primary w-[140px] border-border rounded-lg"
                    placeholder="$ 25.000"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="text-title font-semibold" htmlFor="">
                    stock
                  </label>
                  <input
                    className="flex border px-3 py-2 text-sm text-title bg-primary w-[140px] border-border rounded-lg"
                    placeholder="50"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-title font-semibold" htmlFor="">
                  Descripción
                </label>
                <textarea
                  className="flex border px-3 py-2 text-sm text-title bg-primary w-[300px] border-border rounded-lg"
                  placeholder="Añade una descrión corta"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                  rows="4"
                  cols="50"
                  type="search"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-title font-semibold" htmlFor="">
                  Imagen
                </label>
                <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed rounded-md space-y-4 cursor-pointer">
                  <IconUpload />
                  <p className="text-subtitle text-sm w-[180px] text-center">
                    Selecciona o arraste la imagen de tu producto
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="flex items-center justify-center p-4 relative space-x-10">
          <button
            onClick={closeModal}
            className="flex items-center justify-center text-sm font-medium text-white h-9 bg-red-500 hover:bg-red-500/80 rounded-md px-3 gap-1"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center justify-center text-sm font-medium text-white h-9 bg-green-500 hover:bg-green-500/80 rounded-md px-4 gap-1"
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
}
