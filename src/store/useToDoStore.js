import {create} from 'zustand'
import { getDataApi, categoriesNobaseApi, updateTasksApi, categoriesInfo, fetchCategoriesApi, deleteTaskApi, addTaskApi, addCategoryApi, editCategoryApi, changeTaskStatusApi, editTaskApi, taskInfoApi } from '../api/api';

const getInitialStatusId1 = () => {
  const storedStatusId = localStorage.getItem('statusId');
  return storedStatusId ? parseInt(storedStatusId) : 0;
}

const statusId = getInitialStatusId1
const useStore = create((set, get) => ({
  
  statusId: statusId,  //get().getInitialStatusId1(),
  completed: undefined,
  userData: null,
  categories: [],
  tasks: [],
  isLoading: false,
  error: null,
  changeError: (value) => {
    set({ error: value })
  },

  openTaskInfoS: (e) => {
    let dateString = e?.currentTarget?.getAttribute('data-date');
    if (!dateString) {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      dateString = `${year}-${month}-${day}`;
    }
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    get().openTaskInfoState(formattedDate)
  },

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

  fetchCategories: async () => {
    try {
      fetchCategoriesApi().then(
        response => {
          set({ categories: response })
        }
      )
    } catch (error) {
      console.error("Ошибка при загрузке категорий:", error);
    }
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
        await get().updateTask()
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

  

  onEditCategory: async (id) => {
    get().changeError(null)
    try {
      const categoryData = {
        name: get().categoryName,
        color: get().color,
      };
      await editCategoryApi(id, categoryData)
      await get().updateCategories();
      await get().fetchCategories();
      get().closeModalCategoryState()
    } catch (error) {
      console.error('Ошибка при редактировании категории:', error);
      if (error.response) {
        get().changeError(`Ошибка при редактировании. Проверьте заполнение полей!`)
      }
      else if (error.request) {
        get().changeError(`Ошибка сети`)
      }
    }
  },

  closeModalCategory: async () => {
    get().changeError(null)
    try {
      const categoryData = {
        name: get().categoryName,
        color: get().color,
      };
      await addCategoryApi(categoryData)
      await get().updateCategories();
      await get().fetchCategories();
      get().closeModalCategoryState()
    } catch (error) {
      console.error("Ошибка при создании категории:", error);
      if (error.response) {
        get().changeError("Ошибка при создании категории. Проверьте заполненность полей")
      } else if (error.request) {
        get().changeError(`Ошибка сети`)
      }
    }
  },

  updateTask: async () => {
    try {
      const response = await updateTasksApi()
      set({tasks: response});
    } catch (error) {
      console.error("Ошибка при обновлении задач:", error);
    }
  },
  changeTask: async (id) => {
    get().changeError(null)
    try {
      const taskData = {
        name: get().taskName,
        description: get().taskDescription,
        priority: get().taskPriority,
        category_id: parseInt(get().selectedCategoryId, 10),
        date: get().date,
      };
      await editTaskApi(id, taskData)
      await get().updateTasks();
      get().closeTaskUpdateOpen();
      get().TaskInfoOpen();
    } catch (error) {
      console.error("Ошибка при изменении задачи:", error);
      if (error.response) {
        get().changeError(`Ошибка при изменении задачи! Проверьте заполненность полей!`)
      }
      else if (error.request) {
        get().changeError(`Ошибка сети`)
      }
    }
  },

  isOpenTaskInfo: false,
  isModalCategoryOpen: false,
  openModalCategory: () => set({ isModalCategoryOpen: true }),
  closeModalCategory: () => set({ isModalCategoryOpen: false }),
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

  TaskInfoOpen: () => {
    set({
      isTaskInfoOpen: true
    })
  },

  closeTaskInfoOpen: () => {
    set({
      isTaskInfoOpen: false
    })
  },

  TaskUpdateOpen: () => {
    set({
      isTaskUpdateOpen: true
    })
  },
  closeTaskUpdateOpen: () => {
    set({
      isTaskUpdateOpen: false
    })
  },

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

  getTaskInfo: async (id) => {
    try {
      const taskResponse = await taskInfoApi(id)
      const taskData = taskResponse;
      const categoryId = taskData.category_id;
      get().changeTaskId(taskData.id)
      set({completed: taskData.completed})
      try {
        await categoriesInfo(get().statusId)
      } catch (e) {
        console.error("ошибка при получении имени категории", e)
      }
      get().getTaskInfoState(taskData, categoryId)
    } catch (error) {
      console.error("Ошибка при получении данных задачи:", error);
    }
  },

  changeTaskStatus: async (id) => {
    const taskData = {
      name: get().taskName,
      description: get().taskDescription,
      priority: get().taskPriority,
      category_id: parseInt(get().selectedCategoryId, 10),
      date: get().date
    }
    try {
      const response = await changeTaskStatusApi(id, taskData)
      const newTaskStatuses = { ...get().taskStatuses };
      if (response.completed === true) {
        set({completed: true})
        newTaskStatuses[id] = {
          completed: true,
          statusId: id,
        }
        localStorage.setItem(`completed_${id}`, JSON.stringify(true));
        localStorage.setItem(`statusId_${id}`, id);
      } else {
        set({ completed: false })
        newTaskStatuses[id] = {
          completed: false,
          statusId: id,
        }
        localStorage.setItem(`completed_${id}`, JSON.stringify(false));
        localStorage.setItem(`statusId_${id}`, id);
      }
      set({ taskStatuses: newTaskStatuses })
      get().updateTasks();
    } catch (error) {
      console.error('Ошибка при изменении статуса задачи:', error);
    }
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
    console.log(get().isWarningOpen)
  },

  deleteCategoryDialog: (id) => {
    set({ isWarningOpen: true, categoryId: id })
    console.log("Id", get().categoryId)

  },
  exitWarning: () => {
    set({
      isWarningOpen: false
    })
    console.log("HERE", get().isWarningOpen)
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
  taskId: 0,
  changeTaskId: (id) => {
    set({
      taskId: id
    })
  },
  updateTasks: async () => {
    try {
      const response = await updateTasksApi()
      set({tasks: response})
    } catch (error) {
      console.error("Ошибка при обновлении задач:", error);
    }
  },

  addTask: async () => {
    get().changeError(null)
    try {
      const taskData = {
        name: get().taskName,
        description: get().taskDescription,
        priority: get().taskPriority,
        category_id: parseInt(get().selectedCategoryId, 10),
        date: get().date,
      };
      console.log(taskData)
      await addTaskApi(taskData)
      await get().updateTasks();
      get().closeIsOpenTaskInfo();
      get().changeDate(taskData.date)
    }
    catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
      if (error.response) {
        get().changeError(`Ошибка при добавлении задачи! Проверьте заполненность полей!`)
      } else if (error.request) {
        get().changeError(`Ошибка сети`)
      }
    }
  },
  getTaskStatus: (taskId) => {
    return get().taskStatuses[taskId] || {completed: false, statusId: 0 };
  },
  deleteTask: async (id) => {
    await deleteTaskApi(id)
    await get().updateTasks()
    get().deleteTaskState()
    get().changeCategoryNameState("")
  },

  getTaskInfoState: (taskData, categoryId) => {
    set({
      isTaskOpen: true,
      taskName: taskData.name,
      taskPriority: taskData.priority,
      taskDescription: taskData.description,
      selectedCategoryId: categoryId,
      date: taskData.date,
      categoryId: categoryId
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
      isEditCategoryOpen: false
    })
  },
  
  
}));

export default useStore;