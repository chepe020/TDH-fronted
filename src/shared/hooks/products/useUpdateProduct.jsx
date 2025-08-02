import { updateProduct as updateProductRequest } from "../../../services";

export const useUpdateProduct = () => {
    const updateProduct = async (id, data) => {
        const  response = await updateProductRequest(id, data)

        if (response.error) {
            const errRes = response.error?.response;
            if (errRes?.data?.errors && Array.isArray(errRes.data.errors)) {
                console.log('error')
            } else {
                console.log('error')
            }
            return;
        }
    }

    return{
        updateProduct
    }
}