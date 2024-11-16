import React, { useEffect, useState } from "react";
import api from "@/api/api";
import useModalStore from "@/hook/storeOpenModals";

export default function CreateFactura({ id_pedido, handleBuy }) {
  const { closeModal } = useModalStore();

  const [pedido, setPedido] = useState(null); // Guardamos los detalles del pedido
  const [totalFactura, setTotalFactura] = useState(0);

  // Obtener detalles del pedido al abrir el modal
  useEffect(() => {
    if (id_pedido) {
      const fetchPedido = async () => {
        try {
          const response = await api.get(`/v01/pedido/${id_pedido}`);
          if (response?.data) {
            setPedido(response.data); // Guardar los datos del pedido
            // Calcular el total sumando el precio_total de cada detalle
            const total = response.data.detallePedidoDTOS.reduce(
              (sum, item) => sum + item.precio_total,
              0
            );
            setTotalFactura(total); // Guardar el total en el estado
          } else {
            console.log("No se ha encontrado el pedido.");
          }
        } catch (error) {
          console.log("Error al obtener el pedido:", error);
        }
      };

      fetchPedido();
    }
  }, [id_pedido]);

  return (
    <div className="w-full h-full top-0 left-0 bg-black/70 bg-opacity-60 fixed z-50 flex items-center justify-center py-5">
      <div className="bg-secondary w-auto h-full flex flex-col justify-between overflow-auto rounded-md p-5">
        <div className="flex flex-col items-center">
          <h3 className="text-xl text-title font-semibold text-center">
            Generar Factura
          </h3>
          <div className="w-full my-5 border-b border-white"></div>
        </div>

        <div className="w-auto h-full flex flex-col items-center overflow-auto">
          {pedido ? (
            <div>
              <p className="text-title text-sm px-4">Detalles del pedido</p>
              <div className="w-full flex justify-between">
                <p className="text-title text-sm px-4">{pedido.fecha_pedido}</p>
              </div>

              {/* Tabla de detalles del pedido */}
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="h-4 px-4 py-2 text-sm text-title text-left">
                      Producto
                    </th>
                    <th className="h-4 px-4 py-2 text-sm text-title text-left">
                      Precio
                    </th>
                    <th className="h-4 px-4 py-2 text-sm text-title text-center">
                      Cantidad
                    </th>
                    <th className="h-4 px-4 py-2 text-sm text-title text-center">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pedido.detallePedidoDTOS &&
                  pedido.detallePedidoDTOS.length > 0 ? (
                    pedido.detallePedidoDTOS.map((item) => (
                      <tr key={item.id_detalle_pedido}>
                        <td className="text-subtitle text-sm px-4 py-2">
                          {item.nombre_producto}
                        </td>
                        <td className="text-subtitle text-sm text-center px-4 py-2">
                          ${" "}
                          {item.precio_unitario.toLocaleString("es-CO", {
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td className="text-subtitle text-sm text-center px-4 py-2">
                          {item.cantidad}
                        </td>
                        <td className="text-subtitle text-sm text-center px-4 py-2">
                          ${" "}
                          {item.precio_total.toLocaleString("es-CO", {
                            maximumFractionDigits: 2,
                          })}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <p>No hay productos en este pedido.</p>
                  )}
                </tbody>
              </table>

              {/* Total de la factura */}
              <div className="px-4 mt-2 flex justify-between">
                <p className="text-title">Total factura</p>
                <p className="text-title">
                  ${" "}
                  {totalFactura.toLocaleString("es-CO", {
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>

              {/* Información del cliente */}
              <div className="mt-4 px-4">
                <p className="text-title text-sm">Información del cliente</p>
                <div className="flex flex-col text-sm">
                  <p>
                    <strong>Nombre:</strong> {pedido.nombreCliente}{" "}
                    {pedido.apelldioCliente}
                  </p>
                  <p>
                    <strong>Email:</strong> {pedido.emailCliente}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {pedido.telefonoCliente}
                  </p>
                  <p>
                    <strong>Dirección:</strong> {pedido.direccionCliente}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p>No se ha encontrado el pedido.</p>
          )}
        </div>

        <div className="flex justify-between mt-4">
          <button
            className="py-1 px-3 bg-red-500 hover:bg-red-500/80 rounded-md text-title font-semibold"
            onClick={closeModal}
          >
            Cancelar
          </button>
          <button
            className="py-1 px-3 bg-green-500 hover:bg-green-500/80 rounded-md text-title font-semibold"
            onClick={handleBuy}
          >
            Generar factura
          </button>
        </div>
      </div>
    </div>
  );
}
