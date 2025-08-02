import { updateUser as updateUserRquest } from "../../../services";

export const useUpdateUser = () => {
    const updateUser = async(id, data) => {
        const response = await updateUserRquest(id, data)

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
        updateUser
    }
}