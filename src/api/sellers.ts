import axios from 'axios'

const API_USER = import.meta.env.VITE_API_USER
const API_TOKEN = import.meta.env.VITE_API_TOKEN
const API_URL = import.meta.env.VITE_API_URL

export const getSellers = () => {
  console.log('API_URL', API_URL)
  return axios
    .get(`${API_URL}sellers`, {
      auth: {
        username: API_USER,
        password: API_TOKEN
      }
    })
    .then((response) => {
      return response.data
    })
}

export const getSeller = (id: string) => {
  return axios
    .get(`${API_URL}sellers/${id}`, {
      auth: {
        username: API_USER,
        password: API_TOKEN
      }
    })
    .then((response) => {
      return response.data
    })
}

export const editSeller = (id: string, data: any) => {
  return axios
    .put(`${API_URL}sellers/${id}`, data, {
      auth: {
        username: API_USER,
        password: API_TOKEN
      }
    })
    .then((response) => {
      return response.data
    })
}
