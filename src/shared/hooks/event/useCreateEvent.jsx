import { createEvent as createEventRequest } from "../../../services/api";

export const useCreateEvent = () => {
    const createEvent = async(data) => {
        const response = await createEventRequest(data);

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
        createEvent
    }
}