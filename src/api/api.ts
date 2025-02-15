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

export const getDataApi = async () => {
  try {
    const response = await instance.get('user/self');
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    throw error;
  }
}

export const fetchCategoriesApi = async ()  => {
  return instance.get('categories/').then( response => {
    return response.data
  })
}

export const categoriesInfo = (id) => {
  return instance.get(`categories/${id}`)
    .then(responce => {
      return responce.data;
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

export const categoriesNobaseApi = () => {
  return instance.get(`categories/no_base`)
    .then(responce => {
      return responce.data;
    })
}
export const categorieDeleteApi = (id) => {
  return instance.delete(`categories/${id}`)
    .then(responce => {
      return responce.data;
    })
}

export const addTaskApi = async (taskData) => {
  return instance.post('tasks/', taskData).then(response => {
    return response.data
  })
}

export const updateTasksApi = () => {
  return instance.get(`tasks/`)
    .then(responce => {
      return responce.data;
    })
}

export const taskInfoApi = (id) => {
  return instance.get(`tasks/${id}`)
    .then(responce => {
      return responce.data;
    })
}

export const editTaskApi = (id, taskData) => {
  return instance.put(`tasks/${id}`, taskData)
    .then(responce => {
      return responce.data;
    })
}

export const deleteTaskApi = (id) => {
  return instance.delete(`tasks/${id}`)
    .then(responce => {
      return responce.data;
    })
}

export const changeTaskStatusApi = (id, taskData) => {
  return instance.put(`tasks/${id}/change_status`, taskData)
    .then(responce => {
      return responce.data;
    })
}

export const deleteUserApi = () => {
  return instance.delete(`user/`)
    .then(responce => {
      return responce.data;
    })
}

export const UserEditApi = (userData) => {
  return instance.put(`user/edit`, userData)
    .then(responce => {
      return responce.data;
    })
}






