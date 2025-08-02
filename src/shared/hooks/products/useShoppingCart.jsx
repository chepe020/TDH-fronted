import { useState } from 'react';
import { shoppingCartUser } from '../../../services';

export const useShoppingCart = () => {
    const [cart, setCart] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const addProductToCart = async (productId, amountProduct) => {
        setIsLoading(true);
        setError(null);

        try {
            const { data, ok, error: serviceError } = await shoppingCartUser(productId, amountProduct);

            if (!ok) {
                throw new Error(serviceError || 'Error adding product to cart.');
            }

            setCart(data.cart);
            
        } catch (err) {
            console.error('Error in addProductToCart:', err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        cart,
        isLoading,
        error,
        addProductToCart,
    };
};