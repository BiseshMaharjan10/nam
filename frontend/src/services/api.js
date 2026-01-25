import axios from 'axios';

const ApiFormData = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-type":"multipart/form-data",
    },
});

const Api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
    }
});

const config ={
    headers:{
        'authorization': `Bearer ${localStorage.getItem('token')}`
    }
}

export const createUserApi = (data) => ApiFormData.post("/api/user/register", data);

export const login =(data) => Api.post("/api/user/loginUser",data);

export const getallUser = () => Api.get("/api/user/getallUser",config);

export const deleteUser = (data) => Api.delete(`/api/user/deleteUser/${data}`,config)

export const getUserById = (id) => Api.get(`/api/user/getUser/${id}`,config);

export const updateUser = (id,data) => Api.put(`/api/user/updateUserById/${id}`,data,config);

export const getMe = () => Api.get("/api/user/getme",config);



//----------Product--------------//

export const createProduct = (data) => ApiFormData.post("/api/products/addProducts", data);

export const getProductByName = () => Api.get("/api/products/getProductByName",config);

export const getAllProduct = () => Api.get("/api/products/getallProducts",config);

export const getProductById = () => Api.get(`/api/products/getProductById/${id}`,config);




