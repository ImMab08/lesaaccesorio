import React, { useState } from "react";

import { editar } from "@/utils/editar";
import useModalStore from "@/hook/storeOpenModals";

export default function UpdateUsuario({ usuario, setData }) {
  const { closeModal } = useModalStore();

  console.log("editar user: ", usuario)

  // Estados locales para actualizar los datos de la cliente seleccionada.
  const [ nombre, setNombre ] = useState(usuario?.nombre);
  const [ apellido, setApellido ] = useState(usuario?.apellido);
  const [ email, setEmail ] = useState(usuario?.email);

  const [ error, setError ] = useState("");

  // Función para manejar la edición de la cliente.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!nombre) {
      setError("Tienes que ponerle un nombre a la categoría.");
      return;
    }

    await editar(`/v01/usuario/update/${usuario.id_usuario}`, { nombre, apellido, email });
    setData({
      ...usuario,
      nombre,
      apellido,
      email
    });

    closeModal();
  };

  return (
    <div className="text-title w-full h-full top-0 left-0 bg-black/70 bg-opacity-60 fixed z-50 flex items-center justify-center">
      <div className="rounded-lg bg-secondary">
        <div className="flex flex-col space-y-1.5 p-5">
          <h3 className="text-xl font-semibold text-center">Actualizar información <br />del usuario</h3>
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
                  placeholder="Nombre"
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
                  placeholder="Apelldio"
                  className="flex px-3 py-2 text-sm text-title bg-primary min-w-72 rounded-lg focus:outline-none"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="email">Correo eléctronico</label>
                <input
                  required
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Correo eléctronico"
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