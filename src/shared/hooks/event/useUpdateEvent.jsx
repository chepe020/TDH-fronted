import { updateEvent as updateEventRequest } from "../../../services/api";

export const useUpdateEvent = () => {
    const updateEvent = async(id, data) => {
        const response = await updateEventRequest(id, data)

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
        updateEvent
    }
}