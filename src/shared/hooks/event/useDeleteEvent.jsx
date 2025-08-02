import { deleteEvent as deleteEventRequest } from "../../../services";

export const useDeleteEvent = () => {

    const deleteEvent = async(id) => {
        const response = await deleteEventRequest(id);

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
        deleteEvent
    }
}