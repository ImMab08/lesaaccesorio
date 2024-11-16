import React from "react";

import { eliminar } from "@/utils/eliminar";
import useModalStore from "@/hook/storeOpenModals";

export default function DeleteCliente({ cliente, setData }) {
  const { closeModal } = useModalStore();
  console.log("Cliente eliminado: ", cliente)

  // Función para confirmar la eliminación.
  const handleSubmit = async (e) => {
    e.preventDefault();

    await eliminar(`/v01/cliente/delete/${cliente?.id_cliente}`)
    setData((prev) => 
      prev.filter((item) => item.id_cliente !== cliente.id_cliente)
    );

    closeModal();
  };

  return (
    <div className="text-title w-full h-full top-0 left-0 bg-black/70 bg-opacity-60 fixed z-50 flex items-center justify-center">
      <div className="rounded-lg bg-secondary w-[450px] ">
        <div className="flex flex-col space-y-4 p-5">
          <p className="text-xl text-center">¿Estás seguro que deseas eliminar la cliente <span className="font-semibold">{cliente?.nombre}</span>?</p>
        </div>

        <div className="flex items-center justify-center p-4 relative space-x-10">
          <button onClick={closeModal} className="flex items-center justify-center text-sm font-medium text-white h-9 bg-red-500 hover:bg-red-500/80 rounded-md px-3 gap-1">Cancelar</button>
          <button onClick={handleSubmit} className="flex items-center justify-center text-sm font-medium text-white h-9 bg-green-500 hover:bg-green-500/80 rounded-md px-4 gap-1">Confirmar</button>
        </div>
      </div>
    </div>
  );
}