import { deletePublication } from "../../../services";
import toast from "react-hot-toast";

export const useDeletePublication = () => {
  const handleDeletePublication = async (id) => {
    try {
      const response = await deletePublication(id);
      if (response?.data?.success) {
        toast.success("Publicación eliminada correctamente");
        return true;
      } else {
        toast.error("Error al eliminar la publicación");
        return false;
      }
    } catch (error) {
      toast.error("Error en la solicitud");
      return false;
    }
  };

  return {
    handleDeletePublication,
  };
};
