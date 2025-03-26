import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export interface Card {
  id: string;
  question: string;
  answer: string;
  flipped: boolean;
  box: string;
}
export interface Box {
  id: string;
  title: string;
  description: string;
  cards: Card[];
}

export default function useDragAndDrop() {
  const [boxes, setBoxes] = useState<Box[]>([
    { id: "box1", title: "Por aprender", description: "Revisar cada día.", cards: [] },
    { id: "box2", title: "En aprendizaje", description: "Revisar cada semana.", cards: [] },
    { id: "box3", title: "Aprendidas", description: "Repaso cada un mes.", cards: [] },
  ]);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data, error } = await supabase
        .from("cards")
        .select("*")
        .eq("user_id", user.id);
      if (!error && data) {
        setBoxes(prev =>
          prev.map(box => ({
            ...box,
            cards: (data as Card[]).filter(card => card.box === box.id).map(card => ({
              ...card,
              flipped: false
            }))
          }))
        );
      }
    })();
  }, []);

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
      box: boxId,
    };
    setBoxes(prev =>
      prev.map(box =>
        box.id === boxId ? { ...box, cards: [...box.cards, newCard] } : box
      )
    );
  };

  const deleteCard = async (boxId: string, cardId: string) => {
    setBoxes(prev =>
      prev.map(box =>
        box.id === boxId
          ? { ...box, cards: box.cards.filter(card => card.id !== cardId) }
          : box
      )
    );
    const { error } = await supabase
      .from("cards")
      .delete()
      .eq("id", cardId);
    if (error) {
      console.error("Error al eliminar la tarjeta:", error);
    }
  };

  const flipCard = (boxId: string, cardId: string) => {
    setBoxes(prev =>
      prev.map(box =>
        box.id === boxId
          ? {
              ...box,
              cards: box.cards.map(card =>
                card.id === cardId ? { ...card, flipped: !card.flipped } : card
              ),
            }
          : box
      )
    );
  };

  const moveCard = async (cardId: string, targetBoxId: string) => {
    let movedCard: Card | null = null;
    const newBoxes = boxes.map(box => {
      if (box.cards.some(card => card.id === cardId)) {
        const filtered = box.cards.filter(card => {
          if (card.id === cardId) {
            movedCard = { ...card, box: targetBoxId };
            return false;
          }
          return true;
        });
        return { ...box, cards: filtered };
      }
      return box;
    });
    if (movedCard) {
      const updatedBoxes = newBoxes.map(box =>
        box.id === targetBoxId && movedCard
          ? { ...box, cards: [...box.cards, movedCard] }
          : box
      );
      setBoxes(updatedBoxes);
      const { error } = await supabase
        .from("cards")
        .update({ box: targetBoxId })
        .eq("id", cardId);
      if (error) {
        console.error("Error al mover la tarjeta:", error);
      }
    }
  };

  return { boxes, addCard, deleteCard, flipCard, moveCard };
}
