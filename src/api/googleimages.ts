import axios from 'axios'

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY
const GOOGLE_CX = import.meta.env.VITE_GOOGLE_CX

// get images from google images
export const getImages = (query: string) => {
  return axios
    .get(
      `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&q=${query}&searchType=image`
    )
    .then((response) => {
      return response.data.items
    })
}
