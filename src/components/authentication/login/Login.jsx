'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { login } from "@/api/auth/login";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [credenciales, setCredenciales] = useState({ email: '', password: '' });

  const handleChange = async (e) => {
    setCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isAuthenticate = await login(credenciales.email, credenciales.password)
    if (isAuthenticate) {
      router.push('/inicio');
    } else {
      setError('El correo o la contraseña son incorrectos.')
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-hero bg-no-repeat bg-cover bg-center bg-opacity-20">
      <div className="bg-white rounded-md space-y-16 py-10 px-20 shadow-xl">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold">Lesa Accesorios</p>
          <p className="text-xl font-semibold">Inicio de sesión</p>
        </div>
        <form action="" className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <div className="flex flex-col">
              <label htmlFor="" className="font-semibold">Correo eléctronico</label>
              <input
                required
                type="text"
                name="email"
                onChange={handleChange}
                className="border-b-2 border-gray-500 focus:outline-none focus:ring-0"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="font-semibold">Contraseña</label>
              <input
                required
                type="password"
                name="password"
                onChange={handleChange}
                className="border-b-2 border-gray-500 focus:outline-none focus:ring-0"
              />
            </div>
          </div>

          { error &&  <p className="text-red-500 text-center text-sm font-medium pt-4">{error}</p> }

          <div className="flex justify-center">
            <button type="submit" className="px-4 py-1 border-2 shadow font-bold rounded-md">Iniciar sesión</button>
          </div>
        </form>

        <div className="flex justify-center">
          <Link href='/auth/register' className="text-xs font-bold hover:underline">Registrarme</Link>
        </div>
      </div>
    </div>
  );
}
