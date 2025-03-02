import { useState } from "react";

export type Card = {
  id: string;
  question: string;
  answer: string;
  flipped: boolean;
};

export type Box = {
  id: string;
  title: string;
  description: string;
  cards: Card[];
};

export default function useDragAndDrop() {
  const [boxes, setBoxes] = useState<Box[]>([
    {
      id: "box1",
      title: "Por aprender",
      description: "Revisar cada día.",
      cards: [],
    },
    {
      id: "box2",
      title: "En aprendizaje",
      description: "Revisar cada semana.",
      cards: [],
    },
    {
      id: "box3",
      title: "Aprendidas",
      description: "Repaso cada un mes.",
      cards: [],
    },
  ]);

  const addCard = (boxId: string, question: string, answer: string) => {
    if (!question.trim() || !answer.trim()) {
      alert("Por favor, ingresá tanto la pregunta como la respuesta.");
      return;
    }
    const newCard: Card = {
      id: "card" + Date.now(),
      question,
      answer,
      flipped: false,
    };
    setBoxes((prev) =>
      prev.map((box) =>
        box.id === boxId ? { ...box, cards: [...box.cards, newCard] } : box
      )
    );
  };

  const deleteCard = (boxId: string, cardId: string) => {
    setBoxes((prev) =>
      prev.map((box) =>
        box.id === boxId
          ? { ...box, cards: box.cards.filter((card) => card.id !== cardId) }
          : box
      )
    );
  };

  const flipCard = (boxId: string, cardId: string) => {
    setBoxes((prev) =>
      prev.map((box) =>
        box.id === boxId
          ? {
              ...box,
              cards: box.cards.map((card) =>
                card.id === cardId ? { ...card, flipped: !card.flipped } : card
              ),
            }
          : box
      )
    );
  };

  const moveCard = (cardId: string, targetBoxId: string) => {
    let movedCard: Card | null = null;
    setBoxes((prev) =>
      prev.map((box) => {
        if (box.cards.find((card) => card.id === cardId)) {
          const filtered = box.cards.filter((card) => {
            if (card.id === cardId) {
              movedCard = card;
              return false;
            }
            return true;
          });
          return { ...box, cards: filtered };
        }
        return box;
      })
    );
    if (movedCard) {
      setBoxes((prev) =>
        prev.map((box) =>
          box.id === targetBoxId
            ? { ...box, cards: [...box.cards, movedCard!] }
            : box
        )
      );
    }
  };

  return { boxes, addCard, deleteCard, flipCard, moveCard };
}
