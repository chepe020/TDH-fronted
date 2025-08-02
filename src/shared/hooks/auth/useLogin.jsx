import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as LoginRequest } from "../../../services/api";

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const  navigate = useNavigate();
    const login = async (email, password) => {
        setIsLoading(true)
        
        const response = await LoginRequest({
            email,
            password
        })

        setIsLoading(false)

        if(response.error){
            return console.log('Error al iniciar sesion')
        }

        const { userDetails } = response.data
        localStorage.setItem('user', JSON.stringify(userDetails));
        navigate('/dashboard')
    }

    return{
        login,
        isLoading
    }
}