import {create} from 'zustand'
import { getDataApi, categoriesNobaseApi, updateTasksApi } from '../api/api';

const useStore = create((set) => ({
  userData: null,
  categories: [],
  tasks: [],
  isLoading: false,
  error: null,
  taskStatuses: {},
  token: localStorage.getItem('access_token'),
  setToken: (token) => {
    set({ token: token });
    if (token) {
      localStorage.setItem('access_token', token);
    } else {
      localStorage.removeItem('access_token');
    }
  },
  saveToken: (token) => {
    localStorage.setItem('access_token', token);
    set({ token: token });
  },

  removeToken: () => {
    localStorage.removeItem('access_token');
  },

  updateUserDataInApp: async (updatedUserData) => {
    set({userData: updatedUserData})
  },

  fetchUserData: async () => {
    try{
      const response = await getDataApi()
      set({userData: response,
         categories: response.categories,
          isLoading: true,
          tasks: response.tasks }
      )
      if (response.tasks) {
        const initialTaskStatuses = {};
        response.tasks.forEach(task => {
          initialTaskStatuses[task.id] = {
            completed: task.completed,
            statusId: task.id,
          };
        });
        set({taskStatuses: initialTaskStatuses})
      }
    }
    catch(error){
      set({categories: [],
        tasks: [],
        isLoading: false,
        error: "Не удалось получить категории или задачи: Неверный формат ответа",})
    }
  },

  fetchCategories: async () => {
    try {
      const response = await categoriesNobaseApi()
      set({categories:response})
    } 
    catch (error) {
      set({
        error: "Ошибка при загрузке данных пользователя:",
        categories: [],
        isLoading: false}
      );
    } 
  },

  updateCategories: async () => {
    try {
      const response = await categoriesNobaseApi()
      set({ categories: response })
    } catch (error) {
      set({
        error: "Ошибка при обновлении категорий:",
      });
    }
  },

  updateTasks: async () => {
    try {
      const response = await updateTasksApi()
      set({tasks: response});
    } catch (error) {
      set({
        error: "Ошибка при обновлении задач:",
      });
    }
  },
}));

export default useStore;