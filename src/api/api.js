import axios from "axios"

const getToken = () => localStorage.getItem('access_token');

const instance = axios.create({
  baseURL: 'https://api.energy-cerber.ru/',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})

export const fetchUserName = async () => {
  return instance.get("user/self").then(response => {
    return response.data;
  })
}

export const categoriesInfo = (id) => {
  return instance.get(`categories/${id}`)
    .then(responce => {
      return responce.data;
    })
}

export const fetchCategoriesApi = async ()  => {
  return instance.get('categories/').then( response => {
    return response.data
  })
}

export const addTaskApi = async (taskData) => {
  return instance.post('tasks/', taskData).then(response => {
    return response.data
  })
}

export const addCategoryApi = (categoryData) => {
  return instance.post('categories/', categoryData).then(response => {
    return response.data
  })
}


export const editCategoryApi = (id, categoryData) => {
  return instance.put(`categories/${id}`, categoryData)
    .then(responce => {
      return responce.data;
    })
}


