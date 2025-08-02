import { useState } from "react";
import { getEvents as getEventsRequest } from "../../../services/api";

export const useGetEvents = () => {
    const [events, setEvents] = useState([]);

    const getEvents = async() => {
        const response = await getEventsRequest();

        if (response.error) {
            const errRes = response.error?.response;
            if (errRes?.data?.errors && Array.isArray(errRes.data.errors)) {
                console.log('error')
            } else {
                console.log('error')
            }
            return;
        }

        setEvents(response.data.events)
    }

    return {
        getEvents,
        events
    }
}