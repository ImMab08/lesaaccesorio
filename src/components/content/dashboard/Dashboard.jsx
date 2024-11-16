import React from "react";
import Link from "next/link";
import { itemLogout, items } from "./config";
import Image from "next/image";

export default function Dashboard() {
  const menu = items.map(({ url, texto, icon }) => {
    return (
      <div key={texto} className="">
        <Link href={url} className="flex space-x-2">
          {icon}
          <p className="text-black text-sm font-semibold">{texto}</p>
        </Link>
      </div>
    );
  });

  const logout = itemLogout.map(({ url, texto, icon }) => {
    return (
      <div key={texto} className="">
        <Link href={url} className="flex space-x-2">
          {icon}
          <p className="text-black text-sm font-semibold">{texto}</p>
        </Link>
      </div>
    );
  });

  return (
    <div className="flex flex-col justify-between border-r-2">
      <div className="flex items-center justify-center py-4">
        <Image width={70} height={70} src="/img/logo.png" alt="" style={{ borderRadius: 100}} />
      </div>
      <div className="w-full h-full p-4 space-y-5">{menu}</div>

      <div className="p-4">{logout}</div>
    </div>
  );
}
