"use client";
import { useFetch } from "@/hook/useFetch";
import { IconDefaultProduct } from "@/icons";
import { IconCLose } from "@/icons/IconClose";
import { IconShopping } from "@/icons/IconShopping";
import React, { useState, useEffect } from "react";
import { crear } from "@/utils/crear";
import { eliminar } from "@/utils/eliminar";
import useModalStore from "@/hook/storeOpenModals";
import CreateFactura from "../../modals/factura/CreateFactura";

export default function Inicio() {
  const [cart, setCart] = useState({});
  const [open, setOpen] = useState(false);
  const [pedido, setPedido] = useState({});
  const [selectedFactura, setSelectedFactura] = useState();
  const [openClientsModal, setOpenClientsModal] = useState(false);

  const { modals, openModal, closeModal } = useModalStore();
  const { data: productos } = useFetch("/v01/producto/usuario");
  const { data: clientes } = useFetch("/v01/cliente/usuario");

  // Recuperar el pedido guardado en localStorage si existe
  useEffect(() => {
    const savedPedido = localStorage.getItem("pedidos");
    if (savedPedido) {
      setPedido(JSON.parse(savedPedido));
    }
  }, []);

  const handledSumit = () => {
    setOpen(!open);
  };

  const handleCreatePedido = async (cliente) => {
    console.log("cliente", cliente); // Verifica que el cliente tiene la estructura correcta

    const newPedido = {
      id_cliente: cliente.id_cliente,
    };

    try {
      // Crear el pedido en el backend
      const createPedido = await crear(`/v01/pedido/create`, newPedido);

      console.log("Respuesta de la API:", createPedido); // Verifica la respuesta de la API

      // Verificar si la respuesta tiene la propiedad 'id'
      if (createPedido && createPedido.id) {
        const pedidoId = createPedido.id;

        // Actualizar el estado con el nuevo pedido
        const updatedPedidos = {
          ...pedido,
          id_pedido: pedidoId,
          cliente, // Agregar el cliente al pedido
        };
        setPedido(updatedPedidos);

        // Almacenar en localStorage para persistencia
        localStorage.setItem("pedidos", JSON.stringify(updatedPedidos));
      } else {
        console.error("La respuesta no contiene un 'id' válido:", createPedido);
      }
    } catch (error) {
      console.error("Error al crear pedido:", error);
    }
  };

  const handleAddClient = async (cliente) => {
    try {
      setOpenClientsModal(false); // Cerrar el modal de clientes

      // Crear el pedido con el cliente seleccionado
      await handleCreatePedido(cliente);
    } catch (error) {
      console.error("Error al añadir cliente y crear pedido:", error);
    }
  };

  // Cargar el carrito desde el localStorage al iniciar
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart)); // Si hay carrito en el localStorage, cargarlo
    }
  }, []);

  // Función para actualizar el carrito
  const handleAddToCart = (producto) => {
    // Usar `id_producto` como clave
    const idProducto = producto.id_producto;

    // Si el id_producto es válido, procesar el carrito
    if (idProducto) {
      setCart((prevCart) => {
        const newCart = { ...prevCart };

        // Si ya existe el producto, incrementar la cantidad
        if (newCart[idProducto]) {
          newCart[idProducto].cantidad ++;
        } else {
          // Si no existe, agregarlo al carrito con cantidad 1
          newCart[idProducto] = { ...producto, cantidad: 1 };
        }

        // Guardar el carrito actualizado en el localStorage
        localStorage.setItem("cart", JSON.stringify(newCart));

        return newCart;
      });
    } else {
      console.error("Error: Producto sin ID válido");
    }
  };

  const handleBuy = async () => {
    if (!pedido || !pedido.id_pedido) {
      console.error("No hay un pedido creado.");
      return;
    }

    try {
      // Crear la factura enviando el id_pedido a la API
      const response = await crear(`/v01/factura/create`, {
        id_pedido: pedido.id_pedido,
      });

      // Limpiar el carrito y el pedido después de realizar la compra
      setCart({});
      setPedido({});

      // Limpiar localStorage
      localStorage.removeItem("cart");
      localStorage.removeItem("pedidos");

      // Cerrar el modal después de la compra
      closeModal();
    } catch (error) {
      console.error("Error al crear la factura:", error);
      alert("Hubo un error al procesar la compra. Inténtalo de nuevo.");
    }
  };

  const handleCancelOrder = async () => {
    if (!pedido.cliente || !pedido.id_pedido) {
      alert("No hay un pedido activo para cancelar.");
      return;
    }

    const confirmCancel = confirm(
      "¿Estás seguro de que deseas cancelar el pedido?"
    );
    if (!confirmCancel) return;

    try {
      // Llamada para eliminar el pedido en el backend
      const response = await eliminar(`/v01/pedido/delete/${pedido.id_pedido}`);

      if (response) {
        // Limpiar los datos del pedido y el carrito
        setPedido({ cliente: null, productos: {} });
        setCart({});

        // Eliminar datos del localStorage
        localStorage.removeItem("pedidos");
        localStorage.removeItem("cart");

        alert("Pedido cancelado exitosamente.");
      } else {
        console.error(
          "Error al cancelar el pedido: Sin respuesta del servidor"
        );
        alert("Hubo un problema al cancelar el pedido.");
      }
    } catch (error) {
      console.error("Error al cancelar el pedido:", error);
      alert("Hubo un error al cancelar el pedido.");
    }
  };

  const handleRemoveFromCart = (productoId) => {
    // Eliminar el producto del carrito por ID
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[productoId]; // Eliminamos el producto con el ID proporcionado

      // Guardar el carrito actualizado en localStorage
      localStorage.setItem("cart", JSON.stringify(newCart));

      return newCart;
    });
  };

  // Función para abrir el modal para generar la factura.
  const handledOpenModalFactura = async () => {
    if (!pedido.id_pedido) {
      console.error("No hay un pedido creado.");
      return;
    }

    console.log("id del pedido en detalles: ", pedido.id_pedido);

    // Formatear los detalles del pedido a la estructura correcta
    const detallesPedido = Object.values(cart).map((item) => ({
      id_pedido: pedido.id_pedido, // ID del pedido
      id_producto: item.id_producto, // ID del producto
      cantidad: item.cantidad, // Cantidad del producto en el carrito
    }));

    console.log("Detalles del pedido:", detallesPedido);

    try {
      // Crear el detalle del pedido enviando la estructura esperada por la API
      const createDetalle = await crear(
        `/v01/detallespedido/create`,
        detallesPedido // Detalles del pedido que la API espera
      );

      // Mostrar mensaje de éxito
      alert("Pedido realizado con éxito.");
    } catch (error) {
      console.error("Error al crear el detalle del pedido:", error);
    }

    const idPedido = pedido.id_pedido; // Obtenemos el id del pedido de la mesa seleccionada
    if (idPedido) {
      setSelectedFactura(idPedido); // Establecemos el id de la factura (pedido) seleccionada
      openModal("CreateFactura"); // Abrimos el modal
    } else {
      console.error("No hay pedido asociado a la mesa seleccionada.");
    }
  };

  return (
    <section className="h-full">
      {/* Header */}
      <div className="bg-white p-5 w-full shadow-md flex justify-between items-center">
        <h2 className="text-2xl font-bold">Inicio</h2>
        <div
          className={`relative cursor-pointer ${open ? "text-green-500" : ""}`}
          onClick={handledSumit}
        >
          <IconShopping />
          {Object.keys(cart).length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {Object.values(cart).reduce(
                (acc, item) => acc + item.cantidad,
                0
              )}
            </span>
          )}
        </div>
      </div>

      {/* Modal del Carrito */}
      {open && (
        <div className="absolute w-[30%] h-full bg-gray-100 top-0 right-0 shadow-lg z-50 flex flex-col">
          <div className="p-5 flex items-center space-x-4 text-title border-b-2 border-border">
            <div className="cursor-pointer" onClick={handledSumit}>
              <IconCLose />
            </div>
            <p className="text-xl font-bold">Carrito de Compras</p>
            {pedido.cliente ? (
              <p>{pedido.cliente.nombre}</p>
            ) : (
              <p>Seleccionar cliente</p>
            )}
          </div>
          <div className="px-2 py-5 w-full flex-grow overflow-y-auto">
            {Object.keys(cart).length > 0 ? (
              Object.values(cart).map((item) => (
                <div
                  key={item.nombre}
                  className="flex justify-between items-center bg-white p-2 mb-2 rounded-md shadow"
                >
                  <div>
                    <p className="font-bold">{item.nombre}</p>
                    <p className="text-xs">{item.descripcion}</p>
                    <p>Cantidad: {item.cantidad}</p>
                    <p>Total: $ {item.precio * item.cantidad}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(item.id_producto)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">
                El carrito está vacío.
              </p>
            )}
          </div>
          <div className="w-full py-4 px-5 flex items-center justify-center space-x-5 border-t border-gray-300">
            <button
              className="py-1 px-4 text-lg font-semibold bg-blue-500 hover:bg-blue-500/80 rounded-lg"
              onClick={() => setOpenClientsModal(true)}
            >
              Añadir cliente
            </button>
            <button
              onClick={handleCancelOrder}
              className="py-1 px-4 text-lg font-semibold bg-red-500 hover:bg-red-500/80 rounded-lg"
            >
              Cancelar
            </button>
            <button
              onClick={() => handledOpenModalFactura()}
              className="py-1 px-4 text-lg font-semibold bg-green-500 hover:bg-green-500/80 rounded-lg"
            >
              Comprar
            </button>
          </div>
        </div>
      )}

      {/* Modal de Clientes */}
      {openClientsModal && (
        <div className="absolute w-[30%] h-full bg-gray-100 top-0 left-0 shadow-lg z-50 flex flex-col">
          <div className="p-5 flex items-center space-x-4 text-title border-b-2 border-border">
            <div
              className="cursor-pointer"
              onClick={() => setOpenClientsModal(false)}
            >
              <IconCLose />
            </div>
            <p className="text-xl font-bold">Seleccionar Cliente</p>
          </div>
          <div className="px-5 py-3 overflow-y-auto">
            {clientes && clientes.length > 0 ? (
              clientes.map((cliente) => (
                <div
                  key={cliente.id}
                  onClick={() => handleAddClient(cliente)}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  <p>{cliente.nombre}</p>
                </div>
              ))
            ) : (
              <p>No hay clientes disponibles</p>
            )}
          </div>
        </div>
      )}

      {/* Mostrar productos disponibles */}
      <div className="flex flex-wrap gap-4 p-5">
        {productos && productos.length > 0 ? (
          productos.map((producto) => (
            <div
              onClick={() => handleAddToCart(producto)} // Llama a handleAddToCart al hacer clic
              key={producto.id} // Asegúrate de usar el id como clave única
              className="bg-white p-4 rounded-lg shadow-md w-60 flex cursor-pointer hover:bg-secondary"
            >
              <IconDefaultProduct width={70} height={70} />
              <div className="ml-4">
                <p className="text-xl font-semibold">{producto.nombre}</p>
                <p className="text-sm text-gray-600">{producto.descripcion}</p>
                <p className="text-lg font-bold">${producto.precio}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="w-full text-center">No hay productos disponibles</p>
        )}
      </div>

      {modals.CreateFactura && (
        <CreateFactura id_pedido={selectedFactura} handleBuy={handleBuy} />
      )}
    </section>
  );
}
