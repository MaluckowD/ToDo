import {create} from 'zustand'
import { getDataApi, categoriesNobaseApi, updateTasksApi, categoriesInfo } from '../api/api';

const useStore = create((set) => ({
  userData: null,
  categories: [],
  tasks: [],
  isLoading: false,
  error: null,
  taskStatuses: {},
  getToken: localStorage.getItem('access_token'),
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
    console.log("Setting token:", token);
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
    set({ isLoading: true })
    try {
      const response = await getDataApi()
      console.log(response)
      set({ userData: response })
      set({ categories: response.categories })
      set({ tasks: response.tasks })
      if (response.tasks) {
        const initialTaskStatuses = {};
        response.tasks.forEach(task => {
          initialTaskStatuses[task.id] = {
            completed: task.completed,
            statusId: task.id,
          };
        });
        set({ taskStatuses: initialTaskStatuses })
      }
    } catch (error) {
      set({error: error})
      set({ userData: [] })
      set({ categories: []})
      set({ tasks: [] })
      localStorage.removeItem('access_token');
      console.error("Ошибка при загрузке данных пользователя:", error);
    } finally {
      set({ isLoading: false })
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
        categories: [],});
    }
    finally {
      set({isLoading: false});
    }
  },

  updateCategories: async () => {
    try {
      const response = await categoriesNobaseApi()
      set({ categories: response })
    } catch (error) {
      console.error("Ошибка при обновлении категорий:", error);
    }
  },

  updateTasks: async () => {
    try {
      const response = await updateTasksApi()
      set({tasks: response});
    } catch (error) {
      console.error("Ошибка при обновлении задач:", error);
    }
  },

  isOpenTaskInfo: false,
  isModalCategoryOpen: false,
  openModalCategory: () => set({ isModalCategoryOpen: true }),
  closeModalCat: () => {
    set({
      error: null,
      isModalCategoryOpen: false,
    });
  },
  isEditCategoryOpen: false,
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  isTaskOpen: false,
  isTaskUpdateOpen: false,
  isTaskInfoOpen: false,
  isWarningOpen: false,

  taskName: "",
  changeTaskName: (value) => {
    set({
      taskName: value
    })
  },
  taskDescription: "",
  changeTaskDescription: (value) => {
    set({
      taskDescription: value
    })
  },
  taskPriority: 1,
  categoryName: "",
  date: "",
  changeDate: (value) => {
    set({
      date: value
    })
  },
  selectedCategoryId: "",
  handleCategoryChange: (value) => {
    set({
      selectedCategoryId: value
    })
  },
  error: null,
  openTaskInfoState: (formattedDate) => {
    set({
      date: formattedDate,
      isOpenTaskInfo: true
    })
  },
  taskPriority: 1,
  handlePriorityChange: (value) => {
    set({
      taskPriority: parseInt(value, 10)
    })
  },

  closeIsOpenTaskInfo: () => {
    set({ isOpenTaskInfo: false, 
      taskName: "",
      taskDescription: "",
      taskPriority: "",
      categoryName: "",
      date: "",
      error: null
    })
  },
  color: '#ffffff',
  closeModalEditCat: () => {
    set({
      isEditCategoryOpen: false,
      categoryName: "",
      color: '#ffffff',
      error: null
    })

  },
  categoryId: 0,
  openModalEditCategory: (id) => {
    set({
      categoryId: id,
      isEditCategoryOpen: true,
    })
    categoriesInfo(id).then(response => {
      set({
        categoryName: response.name,
        color: response.color,
      })
    }).catch(error => {
      console.error("Ошибка при получении информации о категории:", error);
    });
  },

  openWarning: () => {
    set({
      isWarningOpen: true,
      isTaskOpen: false,
      taskName: "",
      taskDescription: "",
      selectedCategoryId: "",
      date: ""
    })
  },
  exitWarning: () => {
    set({
      isWarningOpen: false,
    })
  },
  closeIsOpenTask: () => {
    set({
      isTaskOpen: false,
      taskName: "",
      taskDescription: "",
      selectedCategoryId: "",
      date: ""
    })
  },
  getTaskInfoState: (taskData, categoryId) => {
    set({
      isTaskOpen: false,
      taskName: taskData.name,
      taskPriority: taskData.priority,
      taskDescription: taskData.description,
      selectedCategoryId: categoryId,
      date: taskData.date
    })
  },
  deleteTaskState: () => {
    set({
      isTaskOpen: false,
      taskName: "",
      taskPriority: "",
      taskDescription: "",
      date: "",
      isWarningOpen: false
    })
  },
  changeCategoryNameState: (value) => {
    set({
      categoryName: value,
    })
  },
  handleColorChange: (value) => {
    set({
      color: value,
    })
  },
  closeModalCategoryState: () => {
    set({
      categoryName: "",
      color: "#ffffff",
      isModalCategoryOpen: false
    })
  },
  
  
}));

export default useStore;