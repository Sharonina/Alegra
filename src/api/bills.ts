import axios from 'axios'

const API_USER = import.meta.env.VITE_API_USER
const API_TOKEN = import.meta.env.VITE_API_TOKEN
const API_URL = import.meta.env.VITE_API_URL

export const createBill = (seller: number) => {
  const data = {
    client: { id: 1 },
    paymentMethod: 'cash',
    items: [{ id: 1, quantity: 1, price: 20 }],
    dueDate: new Date(),
    date: new Date(),
    seller: seller
  }
  return axios
    .post(`${API_URL}invoices`, data, {
      auth: {
        username: API_USER,
        password: API_TOKEN
      },
      headers: {
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
    .then((response) => {
      return response.data
    })
}
