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
    </div>
  );
}
