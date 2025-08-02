import { deletCard } from "../../../services/api";
import { useState } from "react";

export const useDelteFlashcard = () => {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [errorDelete, setErrorDelete] = useState(null);

  const deleteFlashcard = async (id) => {
    setLoadingDelete(true);
    setErrorDelete(null);
    try {
      const res = await deletCard(id);
      if (res.error) throw res.e;
      return { success: true };
    } catch (err) {
      setErrorDelete(err);
      return { success: false, message: err.message };
    } finally {
      setLoadingDelete(false);
    }
  };

  return { deleteFlashcard, loadingDelete, errorDelete };
};
