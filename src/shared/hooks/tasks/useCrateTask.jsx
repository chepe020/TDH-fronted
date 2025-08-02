import { createTask as createTaskRequest } from "../../../services/api";

export const useCreateTask = () => {

    const createTask = async(data) => {
        const response = await createTaskRequest(data);

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
        createTask
    }
}