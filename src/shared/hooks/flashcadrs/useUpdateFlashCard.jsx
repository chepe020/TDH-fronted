import { useState } from "react";
import { updateCard } from "../../../services/api";

export const useUpdateFlashCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateFlashCard = async (id, data) => {
    setIsLoading(true);
    setErrorUpdate(null);
    setSuccess(false);
    try {
      const response = await updateCard(id, data);
      if (response.success) {
        setSuccess(true);
      }
    } catch (error) {
      setErrorUpdate(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateFlashCard,
    isLoading,
    errorUpdate,
    success,
  };
};
