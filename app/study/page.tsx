"use client";
import React from "react";
import DropBox from "../components/DropBox";
import useDragAndDrop from "../hooks/useDragAndDrop";

export default function GamePage() {
  const { boxes, addCard, deleteCard, flipCard, moveCard } = useDragAndDrop();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-2">
        Estudia con Tarjetas Interactivas
      </h1>
      <p className="text-gray-300 mb-8">
        Arrastra las tarjetas a la caja correspondiente.
      </p>

      <div className="flex flex-nowrap justify-center gap-6 mx-auto w-full max-w-[1200px] my-5">
        {boxes.map((box) => (
          <DropBox
            key={box.id}
            box={box}
            addCard={addCard}
            deleteCard={deleteCard}
            flipCard={flipCard}
            moveCard={moveCard}
          />
        ))}
      </div>

      <div className="mt-16 border-t border-gray-700 pt-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">
          Biblioteca de PDFs
        </h2>
        <p className="text-gray-300 mb-6">
          Sube tus PDFs de estudio y accede a ellos en cualquier momento.
        </p>

        <div className="bg-gray-800 p-6 rounded-lg mb-8 border border-gray-700 hover:border-blue-400 transition-colors">
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
            <p className="text-gray-400 mb-3">Arrastra un PDF aquí o</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Seleccionar archivo
            </button>
            <p className="text-gray-500 text-sm mt-2">PDF (máx. 20MB)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-red-500 p-2 rounded">
                <span className="font-bold">PDF</span>
              </div>
              <div className="ml-3">
                <h3 className="font-medium">Ejemplo-de-estudio.pdf</h3>
                <p className="text-gray-400 text-sm">2.4 MB</p>
              </div>
            </div>
            <div>
              <button className="text-blue-400 hover:text-blue-300 mr-2">Ver</button>
              <button className="text-red-400 hover:text-red-300">Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
