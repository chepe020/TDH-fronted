import { updatePublication } from "../../../services";
import toast from "react-hot-toast";

export const useUpdatePublication = () => {
  const handleUpdatePublication = async (id, data) => {
    const res = await updatePublication(id, data);
    if (res.error) {
      toast.error("Error al actualizar la publicación.");
      return false;
    }
    toast.success("¡Publicación actualizada!");
    return true;
  };

  return { handleUpdatePublication };
};
