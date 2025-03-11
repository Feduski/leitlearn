"use client";

import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen p-8 flex flex-col items-center text-white">
      <h1 className="text-4xl font-bold text-blue-400 mb-6">Planes y Precios</h1>
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-blue-300 mb-2">Básico</h2>
          <p className="text-gray-200 mb-4">$0 / mes</p>
          <ul className="text-gray-200 mb-4">
            <li>Acceso limitado a tarjetas</li>
            <li>Soporte básico</li>
            <li>Acceso a la comunidad</li>
          </ul>
          <Link href="/signup" className="bg-white text-black font-medium hover:bg-gray-300 transition-colors px-4 py-2 rounded-lg">
            Empezar Gratis
          </Link>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-blue-300 mb-2">Pro</h2>
          <p className="text-gray-200 mb-4">$9.99 / mes</p>
          <ul className="text-gray-200 mb-4">
            <li>Acceso ilimitado a tarjetas</li>
            <li>Soporte prioritario</li>
            <li>Acceso a funciones avanzadas</li>
          </ul>
          <Link href="/signup" className="bg-white text-black font-medium hover:bg-gray-300 transition-colors px-4 py-2 rounded-lg">
            Suscribirse
          </Link>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-blue-300 mb-2">Premium</h2>
          <p className="text-gray-200 mb-4">$19.99 / mes</p>
          <ul className="text-gray-200 mb-4">
            <li>Todo en Pro</li>
            <li>Consultas personalizadas</li>
            <li>Acceso anticipado a nuevas funciones</li>
          </ul>
          <Link href="/signup" className="bg-white text-black font-medium hover:bg-gray-300 transition-colors px-4 py-2 rounded-lg">
            Suscribirse
          </Link>
        </div>
      </div>
    </div>
  );
}