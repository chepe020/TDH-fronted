import { useEffect, useState } from "react";
import { viewRequestPendingCategory } from "../../../services/api";

export const useViewRequest = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const getRequests = async () => {
        const res = await viewRequestPendingCategory();
        if (!res.error) {
            setRequests(res.data.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        getRequests();
    }, []);

    return {
        requests,
        loading,
        
    };
};
