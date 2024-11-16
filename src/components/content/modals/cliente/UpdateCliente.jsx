import React, { useState } from "react";

import { editar } from "@/utils/editar";
import useModalStore from "@/hook/storeOpenModals";

export default function UpdateCliente({ cliente, setData }) {
  const { closeModal } = useModalStore();

  // Estados locales para actualizar los datos de la cliente seleccionada.
  const [ nombre, setNombre ] = useState(cliente?.nombre);
  const [ apellido, setApellido ] = useState(cliente?.apellido);
  const [ cliente_email, setEmail ] = useState(cliente?.cliente_email);
  const [ cliente_direccion, setDireccion ] = useState(cliente?.cliente_direccion);
  const [ telefono, setTelefono ] = useState(cliente?.telefono);

  const [ error, setError ] = useState("");

  // Función para manejar la edición de la cliente.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!nombre) {
      setError("Tienes que ponerle un nombre a la categoría.");
      return;
    }

    await editar(`/v01/cliente/update/${cliente.id_cliente}`, { nombre, apellido, cliente_email, cliente_direccion, telefono });
    setData((prev) => 
      prev.map((item) => item.id_cliente === cliente.id_cliente ? { nombre, apellido, cliente_email, cliente_direccion, telefono } : item)
    );

    closeModal();
  };

  return (
    <div className="text-title w-full h-full top-0 left-0 bg-black/70 bg-opacity-60 fixed z-50 flex items-center justify-center">
      <div className="rounded-lg bg-secondary">
        <div className="flex flex-col space-y-1.5 p-5">
          <h3 className="text-xl font-semibold text-center">Actualizar cliente</h3>
        </div>

        <div className="px-6">
          <div className="w-full overflow-auto">
            <form onSubmit={handleSubmit} className="p-2 space-y-4">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="nombre">Nombre</label>
                <input
                  required
                  type="text"
                  value={nombre}
                  placeholder="Añade un nombre a la categoría"
                  onChange={(e) => setNombre(e.target.value)}
                  className="flex px-3 py-2 text-sm text-title bg-primary min-w-72 rounded-lg focus:outline-none"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="apellido">Apellidos</label>
                <input
                  required
                  type="text"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  placeholder="Apellido del cliente"
                  className="flex px-3 py-2 text-sm text-title bg-primary min-w-72 rounded-lg focus:outline-none"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="email">Correo eléctronico</label>
                <input
                  required
                  type="text"
                  value={cliente_email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Correo eléctronico del cliente"
                  className="flex px-3 py-2 text-sm text-title bg-primary min-w-72 rounded-lg focus:outline-none"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="direccion">Dirección</label>
                <input
                  required
                  type="text"
                  value={cliente_direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  placeholder="Dirección del cliente"
                  className="flex px-3 py-2 text-sm text-title bg-primary min-w-72 rounded-lg focus:outline-none"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  required
                  type="text"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="Teléfono del cliente"
                  className="flex px-3 py-2 text-sm text-title bg-primary min-w-72 rounded-lg focus:outline-none"
                />
              </div>

              {error && <p className=" text-red-500 text-sm">{error}</p>}
            </form>
          </div>
        </div>
        <div className="flex items-center justify-center p-4 relative space-x-10">
          <button onClick={() => closeModal("Editarcliente")} className="flex items-center justify-center text-sm font-medium text-white h-9 bg-red-500 hover:bg-red-500/80 rounded-md px-3">Cancelar</button>
          <button onClick={handleSubmit} className="flex items-center justify-center text-sm font-medium text-white h-9 bg-green-500 hover:bg-green-500/80 rounded-md px-4">Actualizar</button>
        </div>
      </div>
    </div>
  );
}