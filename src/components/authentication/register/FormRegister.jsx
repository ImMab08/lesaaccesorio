"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Register } from "@/api/auth/register";
import Link from "next/link";

export default function FormRegister() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    celular: "",
    email: "",
    password: "",
    password_confirm: "",
  });
  const [errors, setErrors] = useState({}); // Manejo de errores

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Actualiza el campo correspondiente en el estado
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { password, password_confirm } = formData;

    // Validar si las contraseñas coinciden
    if (password !== password_confirm) {
      setErrors({ password_confirm: "Las contraseñas no coinciden" });
      return;
    }

    try {
      // Llamar a la función Register
      const success = await Register(
        formData.nombre,
        formData.apellido,
        formData.celular,
        formData.email,
        formData.password
      );

      if (success) {
        // Redirigir a la página de éxito o inicio de sesión
        router.push("/auth/login");
      } else {
        setErrors({ global: "Error al registrar el usuario" });
      }
    } catch (error) {
      console.error("Error submitting form: ", error);
      setErrors({ global: "Error inesperado. Intenta nuevamente." });
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-md space-y-16 py-10 px-20 shadow-xl">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold">Lesa Accesorios</p>
          <p className="text-xl font-semibold">Registro</p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <div className="flex space-x-10">
              <div className="flex flex-col">
                <label htmlFor="nombre" className="font-semibold">
                  Nombre
                </label>
                <input
                  required
                  type="text"
                  name="nombre"
                  onChange={handleInputChange}
                  className="border-b-2 border-gray-500 focus:outline-none focus:ring-0"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="apellido" className="font-semibold">
                  Apellido
                </label>
                <input
                  required
                  type="text"
                  name="apellido"
                  onChange={handleInputChange}
                  className="border-b-2 border-gray-500 focus:outline-none focus:ring-0"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="celular" className="font-semibold">
                Celular
              </label>
              <input
                required
                type="text"
                name="celular"
                onChange={handleInputChange}
                className="border-b-2 border-gray-500 focus:outline-none focus:ring-0"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="font-semibold">
                Correo Electrónico
              </label>
              <input
                required
                type="email"
                name="email"
                onChange={handleInputChange}
                className="border-b-2 border-gray-500 focus:outline-none focus:ring-0"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="font-semibold">
                Contraseña
              </label>
              <input
                required
                type="password"
                name="password"
                onChange={handleInputChange}
                className="border-b-2 border-gray-500 focus:outline-none focus:ring-0"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password_confirm" className="font-semibold">
                Confirmar Contraseña
              </label>
              <input
                required
                type="password"
                name="password_confirm"
                onChange={handleInputChange}
                className="border-b-2 border-gray-500 focus:outline-none focus:ring-0"
              />
            </div>
          </div>

          {/* Mostrar errores */}
          {errors.global && (
            <p className="text-red-500 text-center text-sm font-medium pt-4">
              {errors.global}
            </p>
          )}
          {errors.password_confirm && (
            <p className="text-red-500 text-center text-sm font-medium pt-4">
              {errors.password_confirm}
            </p>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-1 border-2 shadow font-bold rounded-md"
            >
              Registrarme
            </button>
          </div>
        </form>

        <div className="flex justify-center">
          <Link
            href="/auth/login"
            className="text-xs font-bold hover:underline"
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
