import { addComent } from "../../../services";
import toast from "react-hot-toast";

export const useAddComents = () => {
  const createComment = async (data) => {
    const res = await addComent(data);

    if (res?.data?.success) {
      toast.success("Comentario agregado");
      return true;
    } else {
      toast.error("Error al agregar comentario");
      return false;
    }
  };

  return { createComment };
}