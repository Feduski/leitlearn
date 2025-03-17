import React, { useState } from "react";
import { Box } from "../hooks/useDragAndDrop";

interface DropBoxProps {
  box: Box;
  addCard: (boxId: string, question: string, answer: string) => void;
  deleteCard: (boxId: string, cardId: string) => void;
  flipCard: (boxId: string, cardId: string) => void;
  moveCard: (cardId: string, targetBoxId: string) => void;
}

const DropBox: React.FC<DropBoxProps> = ({
  box,
  addCard,
  deleteCard,
  flipCard,
  moveCard,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("text/plain");
    if (cardId) {
      moveCard(cardId, box.id);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleAddCard = () => {
    addCard(box.id, question, answer);
    setQuestion("");
    setAnswer("");
    setShowForm(false);
  };

  const handleCompleteWithAI = async () => {
    if (!question.trim()) return;
    
    const res = await fetch("/api/generateAnswer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    setAnswer(data.answer);
  };

  return (
    <div className="drop-box relative" id={box.id} onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className="flex items-center justify-between w-full">
        <h2>{box.title}</h2>
        <button
          id={`plus-small-${box.id}`}
          style={{
            display: box.cards.length > 0 && !showForm ? "inline-block" : "none",
          }}
          onClick={() => setShowForm(true)}
          className="plus-btn-small"
        >
          +
        </button>
      </div>
      <p>{box.description}</p>

      {box.cards.length === 0 && !showForm && (
        <div id={`plus-big-${box.id}`} className="plus-btn-big" onClick={() => setShowForm(true)}>
          +
        </div>
      )}

      {showForm && (
        <div id={`form-big-${box.id}`} className="form-big flex-col">
          <input
            type="text"
            id={`new-question-${box.id}`}
            placeholder="Pregunta"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="p-1 mb-1 w-full bg-gray-800 text-gray-200 rounded"
          />
          <input
            type="text"
            id={`new-answer-${box.id}`}
            placeholder="Respuesta"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="p-1 mb-1 w-full bg-gray-800 text-gray-200 rounded"
          />
          <div className="flex gap-2 justify-center">
            <button onClick={handleAddCard} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
              Crear
            </button>
            <button onClick={handleCompleteWithAI} className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded">
              Completar con AI
            </button>
          </div>
        </div>
      )}
    <div className="flex flex-col items-center w-full gap-4">
        {box.cards.map((card) => (
          <div
            key={card.id}
            id={card.id}
            className={`card ${card.flipped ? "flip" : ""}`}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text/plain", card.id)}
            onClick={() => flipCard(box.id, card.id)}
          >
            <div className="card-inner">
              <div className="card-front">
                <div className="question">{card.question}</div>
                <button className="delete-btn" onClick={(e) => {
                    e.stopPropagation();
                    deleteCard(box.id, card.id);
                    }}>
                  ×</button>  
              </div>
              <div className="card-back">
                <div className="answer">{card.answer}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropBox;