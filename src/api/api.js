import axios from "axios"

const instance = axios.create({
  baseURL: 'http://energy-cerber.ru:8000/'
})

export const Ping = () => {
  return instance.get(`ping`).then(responce => {
   console.log(responce)
  })
}

export const AuthMe = () => {
  return instance.get(`auth/me`).then(responce => {
    return responce.data;
  })
}

export const UnfollowUser = (id) => {
  return instance.delete(`follow/${id}`).then(responce => {
    return responce.data;
  })
}

export const RegistrateUser = (data) => {
  return instance.post(`register`, data).then(responce => {
    console.log(responce)
  })
}

export const getProfile = (userId) => {
  return instance.get("profile/" + userId).then(responce => {
    return responce.data;
  })
}