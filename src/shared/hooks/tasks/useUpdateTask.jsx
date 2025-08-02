import { updateTask as updateTaskRequest } from "../../../services/api";

export const useUpdateTask = () => {

    const updateTask = async(id, data) => {
        const response = await updateTaskRequest(id, data)

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
        updateTask
    }
}