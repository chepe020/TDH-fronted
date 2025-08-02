import axios from 'axios';

const apiStudy = axios.create({
    baseURL: 'https://tdh-backen-production.up.railway.app/TDAHSystem/v1',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
})

apiStudy.interceptors.request.use(
    (config) => {
        const user = localStorage.getItem('user');
        if (user) {
            const token = JSON.parse(user).token;
            config.headers['x-token'] = token;
        }
        return config;
    },
    (e) => Promise.reject(e)
)


export const login = async (data) => {
    try {
        return await apiStudy.post('/auth/login', data);
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const register = async (data) => {
    try {
        return await apiStudy.post('/auth/register', data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const createTask = async (data) => {
    try {
        return await apiStudy.post('/toDoList/create-ToDoList', data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getTask = async () => {
    try {
        return await apiStudy.get('/toDoList/get-ToDosList')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const deleteTask = async (id) => {
    try {
        return await apiStudy.delete(`/toDoList/delete-ToDoList/${id}`)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const updateTask = async (id, data) => {
    try {
        return await apiStudy.put(`/toDoList/update-ToDoList/${id}`, data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getCategory = async () => {
    try {
        return await apiStudy.get('/categorySubject/viewSubject')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getEvents = async () => {
    try {
        return await apiStudy.get('/event/')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const createEvent = async (data) => {
    try {
        return await apiStudy.post('/event/', data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const updateEvent = async (id, data) => {
    try {
        return await apiStudy.put(`/event/${id}`, data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getInformationUser = async () => {
    try {
        return await apiStudy.get('/users/viewUserbyId')
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const deletCard = async(id) => {
    try {
        return await apiStudy.delete(`/flashcards/deleteFlashcard/${id}`, {
            data: {
                confirm: true
            }
        });
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const updateCard = async(id,data) => {
    try {
        return await apiStudy.put(`/flashcards/updateFlashcard/${id}`,data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const updateUser = async (id, data) => {
    try {
        return await apiStudy.put(`/users/updateUser/${id}`, data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const updatePassword = async (id, data) => {
    try {
        return await apiStudy.put(`/users//updatePassword/${id}`, data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}


export const addPublication = async (data) => {
    try {
        return await apiStudy.post('/publications/', data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const viewPublication = async () => {
    try {
        return await apiStudy.get('/publications/')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const deletePublication = async (id) => {
    try {
        return await apiStudy.delete(`/publications/${id}`)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const updatePublication = async (id, data) => {
    try {
        return await apiStudy.put(`/publications/${id}`, data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const addComent = async (data) => {
    try {
        return await apiStudy.post('/comments', data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const viewCommentidpublication = async (id) => {
    try {
        return await apiStudy.get(`/comments/post/${id}`)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const deletComment = async (id) => {
    try {
        return await apiStudy.delete(`/comments/${id}`)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const updateComment = async (id, data) => {
    try {
        return await apiStudy.put(`/comments/${id}`, data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const deleteEvent = async (id) => {
    try {
        return await apiStudy.delete(`/event/${id}`);
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const getProducts = async() => {
    try {
        return await apiStudy.get('/pucharseWithPoints/viewProduct');
    } catch (e) {
        return{
            error:true,
            e
        }
    }
}

export const confirmPurchase = async() => {
    try {
        return await apiStudy.post('/pucharseWithPoints/confirmPurchase')
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const shoppingCartUser = async(id,data) => {
    try {
        return await apiStudy.post(`/pucharseWithPoints/shoppingCartUser/${id}`, data)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const createProduct = async(data) => {
    try {
        return await apiStudy.post('/pucharseWithPoints/createProduct',data);
    } catch (e) {
        return{
            error:true,
            e
        }
    }
}

export const updateProduct = async(id, data) => {
    try {
        return await apiStudy.put(`/pucharseWithPoints/updateProduct/${id}`,data);
    } catch (e) {
        return{
            error:true,
            e
        }
    }
}

export const deleteProduct = async(id) => {
    try {
        return await apiStudy.delete(`/pucharseWithPoints/deleteProduct/${id}`);
    } catch (e) {
        return{
            error:true,
            e
        }
    }
}

export const addCard = async(data) => {
    try {
        return await apiStudy.post('/flashcards/createFlashcard',data)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const viewCard = async() => {
    try {
        return await apiStudy.get('/flashcards/viewFlashcard')
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const viewRequestPendingCategory = async() => {
    try {
        return await apiStudy.get('/categorySubject/viewRequestSubject')
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const assigname = async(id,data) => {
    try {
        return await apiStudy.post(`/categorySubject/assignMeSubject/${id}`, data)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const viewSucces = async() => {
    try {
        return await apiStudy.get('/successes/viewSuccesses')
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const addCategory = async(data) => {
    try {
        return await apiStudy.post('/categorySubject/requestCreateSubject',data)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
} 