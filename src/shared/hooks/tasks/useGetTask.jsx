import { useState } from "react";
import { getTask as getTaskRequest } from "../../../services/api";

export const useGetTask = () => {
    const [tasks, setTasks] = useState([]);

    const getTasks = async() => {
        const response = await getTaskRequest();

        if (response.error) {
            const errRes = response.error?.response;
            if (errRes?.data?.errors && Array.isArray(errRes.data.errors)) {
                console.log('error')
            } else {
                console.log('error')
            }
            return;
        }

        setTasks(response.data.toDos)
    }

    return{
        getTasks,
        tasks
    }
}