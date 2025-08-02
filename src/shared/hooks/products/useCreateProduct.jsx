import { createProduct  as createProductRequest} from "../../../services";

export const useCreateProduct = () => {
    const createProduct = async(data) => {
        const  response = await createProductRequest(data)

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
        createProduct
    }
}