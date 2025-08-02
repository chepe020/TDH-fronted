import { useState } from "react";
import { assigname } from "../../../services/api";
import { useIonToast } from "@ionic/react"; 

export const useAsing = () => {
  const [loading, setLoading] = useState(false);
  const [presentToast] = useIonToast(); 

  const handleAssignMe = async (id, assignedCategories) => {
    if (assignedCategories.includes(id)) {
      presentToast({
        message: "Ya estás asignado a esta categoría.",
        duration: 2000,
        color: "warning",
      });
      return false; 
    }

    setLoading(true);
    try {
      const response = await assigname(id, { assignMe: true });
      if (response?.data?.success) {
        setLoading(false);
        presentToast({
          message: "Categoría asignada con éxito.",
          duration: 2000,
          color: "success",
        });
        return true;
      } else {
        presentToast({
          message: "Error al asignar la categoría.",
          duration: 2000,
          color: "danger",
        });
      }
    } catch (error) {
      console.error("Error en la asignación:", error);
      presentToast({
        message: "Ocurrió un error inesperado.",
        duration: 2000,
        color: "danger",
      });
    }
    setLoading(false);
    return false;
  };

  return { handleAssignMe, loading };
};