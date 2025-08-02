import { useState, useCallback } from "react";
import { getProducts as getProductsRequest } from "../../../services";

export const useGetProducts = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getProducts = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await getProductsRequest();
            console.log("Respuesta completa de la API (en hook):", response);
            
            if (!response.error && response.data && response.data.products) {
                // Aquí se corrige el problema: Accedemos al array de productos
                setProducts(response.data.products); 
            } else {
                const errorMessage = response?.message || 'Error al obtener los productos o formato de datos inesperado.';
                console.error("Error en el hook:", errorMessage);
                setError(errorMessage);
                setProducts([]);
            }
        } catch (e) {
            console.error('Error inesperado en el hook:', e);
            setError('Ocurrió un error inesperado. Inténtalo de nuevo.');
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    }, [getProductsRequest]); 

    return {
        getProducts,
        products,
        isLoading,
        error
    };
};