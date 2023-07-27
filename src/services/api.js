import axios from 'axios';

//export const key = process.env.API_KEY
export const key = '460b9167d592f2cb291fe85f0303fa92'

const api = axios.create({
    baseURL: `https://api.themoviedb.org/3`
})

export default api;