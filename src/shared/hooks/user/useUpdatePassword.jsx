import { updatePassword as updatePasswordRequest } from "../../../services";

export const useUpdatePassword = () => {

    const updatePassword = async(id, data) => {
        const response = updatePasswordRequest(id, data)

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

    return {
        updatePassword
    }
}