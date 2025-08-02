import { deletComment } from "../../../services";
import toast from "react-hot-toast";

export const useDeleteComment = () => {
  const deleteComment = async (id) => {
    try {
      const response = await deletComment(id);
      if (response?.data?.success) {
        toast.success("Comentario eliminado correctamente");
        return true;
      } else {
        toast.error("Error al eliminar el comentario");
        return false;
      }
    } catch (error) {
      toast.error("Error en la solicitud");
      return false;
    }
  };

  return {
    deleteComment,
  };
};
