import { useState } from "react";
import { addCategory } from "../../../services/api";

export const useAddCategory = () => {
  const [loading, setLoading] = useState(false);

  const handleAddCategory = async (data) => {
    setLoading(true);
    try {
      const response = await addCategory(data);
      if (response?.data?.success) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { handleAddCategory, loading };
};
