import { useState, useEffect } from "react";
import { viewCard } from "../../../services/api";

export const useViewFlashCard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFlashcards = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await viewCard();
      if (res.error) throw res.e;
      setFlashcards(res.data.flashcards || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlashcards(); 
  }, []);

  return { flashcards, loading, error, fetchFlashcards };
};
