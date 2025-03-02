"use client";
import Link from "next/link";

export default function HowTo() {
  return (
    <div className="min-h-screen p-8 flex flex-col items-center text-white">
      <h1 className="text-4xl font-bold text-blue-400 mb-6">
        ¿Cómo funciona el Método Leitner?
      </h1>

      {/* Descripción general */}
      <div className="max-w-3xl text-center text-lg leading-relaxed">
        <p className="text-gray-200 mb-4">
          El <strong>Método Leitner</strong> es un sistema de estudio basado en la
          repetición espaciada. Se divide el contenido a repasar en diferentes
          “cajas” según el nivel de dominio que tengas sobre cada pregunta. Así, dedicas
          más tiempo a lo que necesitas mejorar y refuerzas lo que ya sabes.
        </p>
      </div>

      {/* Contenedores (cajas) explicadas */}
      <div className="flex flex-col md:flex-row gap-8 mt-8 w-full max-w-5xl">
        {/* Caja 1 */}
        <div className="bg-gray-800 p-6 rounded rounded-br-[75px] shadow-md flex-1 text-left">
          <h2 className="text-xl font-semibold text-blue-300 mb-2">Caja 1: “Por aprender”</h2>
          <p className="text-gray-200">
            <strong>Frecuencia:</strong> Se repasa cada día. 
            <br/>
            Cada tarjeta nueva inicia aquí. 
            <br/>
            Si respondes bien, la tarjeta pasa a la siguiente caja.
            <br/>
            Si fallas, se queda o regresa aquí.
          </p>
        </div>

        {/* Caja 2 */}
        <div className="bg-gray-800 p-6 rounded rounded-br-[75px] shadow-md flex-1 text-left">
          <h2 className="text-xl font-semibold text-blue-300 mb-2">Caja 2: “En aprendizaje”</h2>
          <p className="text-gray-200">
            <strong>Frecuencia:</strong> Se repasa cada semana.
            <br/>
            Si aciertas, la tarjeta avanza a la siguiente caja.
            <br/>
            Si fallas, vuelve a la Caja 1 para reforzarla.
          </p>
        </div>

        {/* Caja 3 */}
        <div className="bg-gray-800 p-6 rounded rounded-br-[75px] shadow-md flex-1 text-left">
          <h2 className="text-xl font-semibold text-blue-300 mb-2">Caja 3: “Aprendidas”</h2>
          <p className="text-gray-200">
            <strong>Frecuencia:</strong> Se repasa cada mes.
            <br/>
            Si aciertas, mantienes tu dominio.
            <br/>
            Si fallas, regresa a la Caja 1 y repites el ciclo.
          </p>
        </div>
      </div>

      {/* CTA final */}
      <div className="mt-5 text-center">
        <p className="text-gray-300 text-lg pb-4">
          Con esta técnica, reforzás lo que ya sabes y dedicas más tiempo a lo que necesitas mejorar.
        </p>
        <Link
          href="/study"
          className="bg-white text-black font-medium hover:bg-gray-300 transition-colors px-4 py-2 rounded-lg mt-8"
        >
          ¡Probalo y aprobá más fácil!
        </Link>
      </div>
    </div>
  );
}
