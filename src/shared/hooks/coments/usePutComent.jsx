import { updateComment } from "../../../services/api";
import { useState } from "react";

export const usePutComent = () => {
  const [loading, setLoading] = useState(false);

  const putComment = async (id, data) => {
    setLoading(true);
    const response = await updateComment(id, data);
    setLoading(false);
    return response;
  };

  return { putComment, loading };
};
