import { deleteTask as deleteTaskRequest } from "../../../services/api";

export const useDeleteTask = () => {
    const deleteTask = async(id) => {
        const response = await deleteTaskRequest(id);

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
        deleteTask
    }
}