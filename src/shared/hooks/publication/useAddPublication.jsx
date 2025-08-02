import { useState } from "react";
import toast from "react-hot-toast";
import { addPublication } from "../../../services/api";

export const useAddPublication = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createPublication = async ({ title, content, author }) => {
    setIsLoading(true);
    const response = await addPublication({ title, content, author });
    setIsLoading(false);

    if (response.error) {
      return toast.error(
        response?.e?.response?.data?.message || "Error al publicar."
      );
    }

    toast.success("¡Publicación exitosa!");
    return true;
  };

  return {
    createPublication,
    isLoading,
  };
};
