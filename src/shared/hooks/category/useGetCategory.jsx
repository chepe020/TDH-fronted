import { useState } from "react";
import { getCategory as getCategoryRequest } from "../../../services/api";

export const useGetCategory = () => {
    const [categories, setCategories] = useState([])

    const getCategory = async() => {
        const response = await getCategoryRequest();

        if (response.error) {
            const errRes = response.error?.response;
            if (errRes?.data?.errors && Array.isArray(errRes.data.errors)) {
                console.log('error')
            } else {
                console.log('error')
            }
            return;
        }

        setCategories(response.data.data)
    }

    return{
        getCategory,
        categories
    }
}
