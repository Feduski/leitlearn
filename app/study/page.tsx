"use client";
import { useEffect } from "react";

export default function GamePage() {
  useEffect(() => {
    function dragStart(event: DragEvent) {
      const target = event.target as HTMLElement;
      event.dataTransfer?.setData("text/plain", target.id);
    }
    function allowDrop(event: DragEvent) {
      event.preventDefault();
    }
    function drop(event: DragEvent) {
      event.preventDefault();
      const cardId = event.dataTransfer?.getData("text/plain");
      if (!cardId) return;
      const card = document.getElementById(cardId);
      if (!card) return;

      let dropZone = event.target as HTMLElement | null;
      while (dropZone && !dropZone.classList.contains("drop-box")) {
        dropZone = dropZone.parentElement;
      }
      if (dropZone) {
        dropZone.appendChild(card);
      }
    }
    function flipCard(cardElement: HTMLElement) {
      cardElement.classList.toggle("flip");
    }
    function addCard() {
      const questionInput = document.getElementById("new-question") as HTMLInputElement;
      const answerInput = document.getElementById("new-answer") as HTMLInputElement;
      if (!questionInput || !answerInput) return;

      const question = questionInput.value.trim();
      const answer = answerInput.value.trim();
      if (!question || !answer) {
        alert("Por favor, ingresa tanto la pregunta como la respuesta.");
        return;
      }

      // Crear la tarjeta
      const newCard = document.createElement("div");
      newCard.id = "card" + Date.now();
      newCard.className = "card";
      newCard.draggable = true;
      newCard.setAttribute("ondragstart", "dragStart(event)");
      newCard.onclick = () => flipCard(newCard);

      // Botón de eliminar
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "×";
      deleteBtn.onclick = (e) => {
        e.stopPropagation();
        newCard.remove();
      };

      const cardInner = document.createElement("div");
      cardInner.className = "card-inner";

      const cardFront = document.createElement("div");
      cardFront.className = "card-front";
      const questionDiv = document.createElement("div");
      questionDiv.className = "question";
      questionDiv.textContent = question;
      cardFront.appendChild(questionDiv);
      cardFront.appendChild(deleteBtn);

      const cardBack = document.createElement("div");
      cardBack.className = "card-back";
      const answerDiv = document.createElement("div");
      answerDiv.className = "answer";
      answerDiv.textContent = answer;
      cardBack.appendChild(answerDiv);

      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);
      newCard.appendChild(cardInner);

      const box1 = document.getElementById("box1");
      box1?.appendChild(newCard);

      questionInput.value = "";
      answerInput.value = "";
    }
    function completeWithAI() {
      alert("Función AI pendiente de implementar");
    }

    // Exponer las funciones en window
    (window as any).dragStart = dragStart;
    (window as any).allowDrop = allowDrop;
    (window as any).drop = drop;
    (window as any).flipCard = flipCard;
    (window as any).addCard = addCard;
    (window as any).completeWithAI = completeWithAI;
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 text-white">
      {/* Encabezado de la página */}
      <h1 className="text-3xl font-bold mb-2">Estudia con Tarjetas Interactivas</h1>
      <p className="text-gray-300 mb-8">
        Arrastra las tarjetas de una caja a otra a medida que avances en tu dominio. 
        Si necesitas crear nuevas tarjetas, hazlo en el panel de abajo.
      </p>

      {/* Panel para crear tarjetas */}
      <div className="bg-gray-800 p-6 rounded mb-8">
        <h2 className="text-xl font-semibold mb-4">Crear Nueva Tarjeta</h2>
        <div className="flex flex-col md:flex-row items-center gap-2 mb-4">
          <input
            type="text"
            id="new-question"
            placeholder="Ingresa la pregunta"
            className="p-2 rounded text-gray w-full md:w-1/2 bg-gray-900"
          />
          <input
            type="text"
            id="new-answer"
            placeholder="Ingresa la respuesta"
            className="p-2 rounded text-gray w-full md:w-1/2 bg-gray-900"
          />
        </div>

        {/* Centrar los botones */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => (window as any).addCard()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Ingresar respuesta
          </button>
          <button
            id="ai-complete-btn"
            onClick={() => (window as any).completeWithAI()}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Completar con AI
          </button>
        </div>
      </div>

      <p className="mb-4">¡Arrastra las tarjetas a la caja correspondiente!</p>
      
      <div className="board flex justify-center gap-6 mx-auto w-full">

        <div
          className="drop-box"
          id="box1"
          onDragOver={(e) => (window as any).allowDrop(e)}
          onDrop={(e) => (window as any).drop(e)}
        >
          <h2>Por aprender</h2>
          <p>Revisar cada día.</p>

          <div
            className="card"
            draggable
            id="card1"
            onDragStart={(e) => (window as any).dragStart(e)}
            onClick={(e) => (window as any).flipCard(e.currentTarget)}
          >
            <div className="card-inner">
              <div className="card-front">
                <div className="question">¿Capital de Francia?</div>
              </div>
              <div className="card-back">
                <div className="answer">París</div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="drop-box"
          id="box2"
          onDragOver={(e) => (window as any).allowDrop(e)}
          onDrop={(e) => (window as any).drop(e)}
        >
          <h2>En aprendizaje</h2>
          <p>Revisar cada semana.</p>
        </div>

        <div
          className="drop-box"
          id="box3"
          onDragOver={(e) => (window as any).allowDrop(e)}
          onDrop={(e) => (window as any).drop(e)}
        >
          <h2>Aprendidas</h2>
          <p>Repaso cada un mes.</p>
        </div>
      </div>
    </div>
  );
}
