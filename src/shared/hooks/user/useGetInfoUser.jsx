import { useState, useCallback } from "react";
import { getInformationUser as getUserRequest } from "../../../services/api";

export const useInfomationUser = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getUserInfo = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getUserRequest();

            if (response.error) {
                const errorMessage = response.error.response?.data?.msg || 'Error al obtener los datos del usuario.';
                throw new Error(errorMessage);
            }
            
            const user = response.data.users[0];
            
            setUserDetails(user);
            return user; 
        } catch (err) {
            console.error("Error en getUserInfo:", err);
            setError(err.message || 'Error desconocido.');
            throw err; 
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        getUserInfo,
        userDetails,
        loading,
        error
    };
};