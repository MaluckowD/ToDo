import { ICategory, ITask, IUser } from './../types/tasks.d';
import axios from "axios"
import { ICategoryAdd, ITaskData, IUserData, IUserDataRegistration, IUserLogin } from "types/tasks";

const getToken = () => localStorage.getItem('access_token');

const instance = axios.create({
  baseURL: 'https://api.energy-cerber.ru/',
  headers: {
    ContentType: 'multipart/form-data',
    Authorization: `Bearer ${getToken()}`
  }
})

export const fetchUserName = async (): Promise<IUser> => {
  return instance.get("user/self").then(response => {
    return response.data;
  })
}

export const addAvatarApi = async (formData: FormData): Promise<IUser> => {
  return instance.post("user/avatar", formData).then(response => {
    return response.data
  })
}
export const sendCodeApi = async (email: string): Promise<any> => {
  return instance.get(`user/register/verify_code?email=${email}`).then(response => {
    return response;
  })
}

export const confirmationApi = async (email: string, code: string):Promise<any>  => {
  return instance.post(`user/register/verify_code?email=${email}&code=${code}`).then(response => {
    return response;
  })
}

export const registartionApi = async (userData: IUserDataRegistration):Promise<any> => {
  return instance.post(`user/register`, userData).then(response => {
    return response;
  })
}

export const loginApi = async (data: IUserLogin):Promise<any> => {
  return instance.post(`user/login`, data).then(response => {
    return response;
  })
}

export const getDataApi = async (): Promise<IUser>  => {
  try {
    const response = await instance.get('user/self');
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    throw error;
  }
}


export const getAvatarData = async (avatarId: number) => {
  try {
    await instance.get(`static/avatars/${avatarId}.webp`)
    return true
  } catch (error) {
    return false
  }
}

export const fetchCategoriesApi = async () => {
  return instance.get('categories/').then(response => {
    return response.data
  })
}

export const categoriesInfo = (id: number):Promise<ICategory> => {
  return instance.get(`categories/${id}`)
    .then(responce => {
      return responce.data;
    })
}

export const addCategoryApi = (categoryData: ICategoryAdd): Promise<ICategory> => {
  return instance.post('categories/', categoryData).then(response => {
    console.log(response.data)
    return response.data
  })
}

export const editCategoryApi = (id: number, categoryData: ICategoryAdd): Promise<ICategory> => {
  return instance.put(`categories/${id}`, categoryData)
    .then(responce => {
      console.log(categoryData.color)
      return responce.data;
    })
}

export const categoriesNobaseApi = () => {
  return instance.get(`categories/no_base`)
    .then(responce => {
      return responce.data;
    })
}
export const categorieDeleteApi = (id: number):Promise<ICategory> => {
  return instance.delete(`categories/${id}`)
    .then(responce => {
      return responce.data;
    })
}

export const addTaskApi = async (taskData: ITaskData): Promise<ITask> => {
  return instance.post('tasks/', taskData).then(response => {
    return response.data
  })
}

export const updateTasksApi = (): Promise<ITask> => {
  return instance.get(`tasks/`)
    .then(responce => {
      return responce.data;
    })
}

export const taskInfoApi = (id: number): Promise<ITask> => {
  return instance.get(`tasks/${id}`)
    .then(responce => {
      return responce.data;
    })
}

export const editTaskApi = (id: number, taskData: ITaskData) => {
  return instance.put(`tasks/${id}`, taskData)
    .then(responce => {
      return responce.data;
    })
}

export const deleteTaskApi = (id: number): Promise<ITask> => {
  return instance.delete(`tasks/${id}`)
    .then(responce => {
      return responce.data;
    })
}

export const changeTaskStatusApi = (id: number, taskData: ITaskData): Promise<ITask> => {
  return instance.put(`tasks/${id}/change_status`, taskData)
    .then(responce => {
      console.log(responce.data)
      return responce.data;
    })
}

export const deleteUserApi = (): Promise<IUser> => {
  return instance.delete(`user/`)
    .then(responce => {
      return responce.data;
    })
}

export const UserEditApi = (userData: IUserData): Promise<IUser>  => {
  return instance.put(`user/edit`, userData)
    .then(responce => {
      return responce.data;
    })
}






