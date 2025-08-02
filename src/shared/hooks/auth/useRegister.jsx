import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as registerRequest } from "../../../services/api";


export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const register = async (userData) => {
        setIsLoading(true);

        const response = await registerRequest(userData);


        setIsLoading(false);

        if (response.error) {
            const errRes = response.error?.response;
            if (errRes?.data?.errors && Array.isArray(errRes.data.errors)) {
                console.log('error')
            } else {
                console.log('error')
            }
            return;
        }

        navigate("/login", { replace: true });
        window.location.reload();
    };

    return {
        register,
        isLoading,
    };
};