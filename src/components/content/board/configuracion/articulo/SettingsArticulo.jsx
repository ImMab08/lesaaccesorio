"use client";
import React, { useState } from "react";

import Articulo from "./config/Articulo";
import { IconArrowDown } from "@/icons";

export function SettingsArticulo() {
  const [ openConfig, setOpenConfig ] = useState(false);

  const handledSumit = () => {
    setOpenConfig(!openConfig);
  };

  return (
    <section className="w-full h-full flex flex-col text-title overflow-auto gap-5">
      <div className="w-full h-auto bg-primary rounded-lg p-5 space-y-5">
        <div className="flex cursor-pointer" onClick={handledSumit}>
          <h1 className="flex-1 text-lg md:text-xl text-title font-semibold">Configuración de Articulos</h1>
          <div className={`cursor-pointer transform transition-transform duration-300 ${ openConfig ? "rotate-0" : "-rotate-180"}`}>
            <IconArrowDown />
          </div>
        </div>

        {openConfig && (
          <section className="flex flex-col">
            <Articulo />
          </section>
        )}
      </div>
    </section>
  );
}
