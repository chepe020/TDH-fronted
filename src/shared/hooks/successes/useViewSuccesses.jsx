import { useState, useEffect } from "react";
import { viewSucces } from "../../../services/api";
import { useIonToast } from "@ionic/react";

export const useViewSuccesses = () => {
  const [successes, setSuccesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [presentToast] = useIonToast();

  const fetchSuccesses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await viewSucces();
      if (response?.data?.success) {
        setSuccesses(response.data.successes);
      } else {
        setError("Error al cargar los logros.");
        presentToast({
          message: "Error al cargar los logros.",
          duration: 2000,
          color: "danger",
        });
      }
    } catch (e) {
      setError("Ocurrió un error inesperado.");
      presentToast({
        message: "Ocurrió un error inesperado.",
        duration: 2000,
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuccesses();
  }, []);

  return {
    successes,
    loading,
    error,
    fetchSuccesses,
  };
};