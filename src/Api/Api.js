import axios from "axios";

const API = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com"
})

export const getApi = ()=>{
     return (API.get("/users"))
}