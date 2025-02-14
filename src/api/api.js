import axios from "axios"

const getToken = () => localStorage.getItem('access_token');

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://api.energy-cerber.ru/',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})

export const fetchUserName = async () => {
  instance.get("user/self").then(response => {
    return response.data;
  })
}


