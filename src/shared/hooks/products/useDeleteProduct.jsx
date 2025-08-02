import { deleteProduct as deleteProductRequest } from "../../../services";

export const useDeleteProduct = () => {
    const deleteProduct = async (id) => {
        const response = await deleteProductRequest(id)

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
        deleteProduct
    }
}