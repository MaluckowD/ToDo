import {create} from 'zustand'
import {  getDataApi, categoriesNobaseApi, updateTasksApi, 
          categoriesInfo, fetchCategoriesApi, deleteTaskApi, 
          addTaskApi, addCategoryApi, editCategoryApi, 
          changeTaskStatusApi, editTaskApi, taskInfoApi, 
          UserEditApi, getAvatarData, addAvatarApi, 
          fetchUserName, deleteUserApi, categorieDeleteApi } 
from '../api/api';
import userAvatar from "../images/user.jpg"

const getInitialStatusId1 = () => {
  const storedStatusId = localStorage.getItem('statusId');
  return storedStatusId ? parseInt(storedStatusId) : 0;
}
const statusId = getInitialStatusId1

const useStore = create((set, get) => ({
  
  statusId: statusId,
  completed: undefined,
  userData: null,
  categories: [],
  tasks: [],
  isLoading: true,
  ERROR: null,
  events: [],
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  numOfDays: [],
  emptyDays: [],
  name: "",
  isDialogOpenForDeleteUser: false,
  isDialogOpenForDeleteCategory: false,
  isDialogOpenForDeleteTask: false,
  DeleteUserDialog: () => {set({isDialogOpenForDeleteUser: true})},

  deleteCategoryDialog: (id) => { 
    set({ isDialogOpenForDeleteCategory: true, categoryId: id})},

  deleteTaskDialog: () => { 
    set({ isDialogOpenForDeleteTask: true, isTaskOpen: false})},

  closeDeleteUserDialog: () => { set({ isDialogOpenForDeleteUser: false }) },
  closeDeleteCategoryDialog: () => { set({ isDialogOpenForDeleteCategory: false }) },
  closeDeleteTaskDialog: () => { set({ isDialogOpenForDeleteTask: false }) },
  changeName: (value) => { set({name: value}) },
  changeSurname: (value) => { set({ surname: value }) },

  deleteUser: () => {
    if (get().token) {
      deleteUserApi().then(response => {
        get().removeToken()

      })
    }
  },
  changeGender: (value) => {
    set({ gender: value })
  },

  handleKeyDown: (event) => {
    if (event.key === 'Escape') {
      get().closeModalCat();
      get().closeModal();
      get().closeModalEditCat();
      get().closeIsOpenTaskInfo();
      get().closeIsOpenTask();
      get().closeTaskInfoOpen()
      get().closeTaskUpdateOpen()
    }
  },

  handleClickOutside: (event, modalRef) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      get().closeModalCat();
      get().closeModal();
      get().closeModalEditCat();
      get().closeIsOpenTaskInfo();
      get().closeIsOpenTask();
      get().closeTaskInfoOpen()
      get().closeTaskUpdateOpen()
    }
  },

  nextMonth: () => {
    if (get().month === 11) {
      set({ year: get().year + 1, month: 0})
    } else {
      set({ month: get().month + 1})
    }
  },

  prevMonth: () => {
    if (get().month === 0) {
      set({ year: get().year - 1, month: 11 })
    } else {
      set({ month: get().month - 1 })
    }
  },

  handleDrop: async (e, date, draggedItem, s) => {
    if (e.target.closest(`.${s.adaptive}`)) {
      e.target.closest(`.${s.adaptive}`).classList.remove(s.dragover)
    }
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    if (draggedItem.current && taskId) {
      try {
        const response = await taskInfoApi(taskId)
        const newDate = new Date(get().year, get().month, date + 1)
        const taskData = {
          ...response,
          date: newDate.toISOString().slice(0, 10)
        };
        await editTaskApi(taskId, taskData)
        get().updateTasks()
      } catch (error) {
        console.error('Ошибка при загрузке задачи для перетаскивания:', error);
      }
      draggedItem.current = null
    }
  },

  
  updateMonthYear: (newMonth, newYear) => {
    set({ month: newMonth, year: newYear })
  },

  goToCurrentMonth: () => {
    const currentDate = new Date();
    set({ month: currentDate.getMonth(), year: currentDate.getFullYear() })

  },
  numOfDays: [],
  emptyDays: [],
  getNoOfDays: () => {
    let i;
    let daysInMonth = new Date(get().year, get().month + 1, 0).getDate();
    let dayOfWeek = new Date(get().year, get().month).getDay();
    let emptyDaysArray = [];
    if (dayOfWeek === 0) {
      for (i = 1; i <= 6; i++) {
        emptyDaysArray.push(i);
      }
    } else {
      for (i = 1; i <= dayOfWeek - 1; i++) {
        emptyDaysArray.push(i);
      }
    }
    let daysArray = [];
    for (i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }
    set({ numOfDays: daysArray, emptyDays: emptyDaysArray })
  },

  handleDateChange: (event) => {
    if (get().updateMonthYear) {
      const selectedMonth = event.value.getMonth();
      const selectedYear = event.value.getFullYear();
      get().updateMonthYear(selectedMonth, selectedYear);
    }
  },

  handleNewData: async (incomingData) => {
    if (!Array.isArray(incomingData)) {
      console.error("Ошибка: incomingData не является массивом");
      return;
    }

    try {
      const updatedEvents = await Promise.all(incomingData.map(async (item) => {
        if (!item || !item.id || !item.name || !item.date) {
          console.warn("Неверные данные:", item);
          return null;
        }

        try {
          const eventDate = new Date(item.date);
          let theme = '';
          try {
            const response = await categoriesInfo(item.category_id)
            theme = response.color;
          } catch (categoryError) {
            console.error("Ошибка при получении категории:", categoryError, item);
            theme = '';
          }
          return {
            id: item.id,
            event_date: eventDate,
            event_title: item.name,
            event_theme: theme,
            task_id: item.id
          };
        } catch (error) {
          console.error("Ошибка при создании даты:", error, item);
          return null;
        }
      }));

      set({events: updatedEvents.filter(item => item !== null)});
    } catch (error) {
      console.error("Общая ошибка при обработке данных", error)
    }
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
      await fetchCategoriesApi().then(
        response => {
          set({ categories: response })
        }
      )
    } catch (error) {
      console.error("Ошибка при загрузке категорий:", error);
    }
  },

  updateUserDataInApp: async (updatedUserData) => {
    set({
      userData: updatedUserData
    })
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
      localStorage.removeItem('access_token');
      console.error("Ошибка при загрузке данных пользователя:", error);
    } finally {
      set({ isLoading: false })
    }
  },

  


  fetchCategoriesNoBase: async () => {
    try {
      const response = await categoriesNobaseApi()
      set({categories: response})
    } 
    catch (error) {
      console.error("Ошибка при загрузке данных пользователя:")
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
    set({ ERROR: null})
    const categoryName = get().categoryName;
    const color = get().color;

    try {
      const categoryData = {
        name: categoryName,
        color: color,
      };
      await editCategoryApi(id, categoryData);
      await get().updateCategories();
      await get().fetchCategoriesNoBase();
      get().closeModalCategoryState();
    } catch (error) {
      console.error('Ошибка при редактировании категории:', error);
      if (error.response) {
        set({ ERROR: `Ошибка при редактировании. Проверьте заполнение полей!` })
      }
      else if (error.request) {
        set({ ERROR: `Ошибка сети` })
      }
    }
  },

  closeModalCategoryApi: async () => {
    set({ ERROR : null})
    try {
      const categoryData = {
        name: get().categoryName,
        color: get().color,
      };
      console.log("Data", categoryData)
      await addCategoryApi(categoryData)
      get().updateCategories();
      await get().fetchCategoriesNoBase();
      get().closeModalCategoryState()
    } catch (error) {
      console.error("Ошибка при создании категории:", error);
      if (error.response) {
        set({
          ERROR: "Ошибка при создании категории.Проверьте заполненность полей"})
      } else if (error.request) {
        set({ERROR: `Ошибка сети`})
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
    set({ ERROR: null})
    //get().changeError(null)
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
        set({ ERROR: `Ошибка при изменении задачи! Проверьте заполненность полей!` })
      }
      else if (error.request) {
        set({ ERROR: `Ошибка сети` })
      }
    }
  },

  isOpenTaskInfo: false,
  isModalCategoryOpen: false,
  openModalCategory: () => set({ isModalCategoryOpen: true }),
  closeModalCategory: () => set({ isModalCategoryOpen: false }),
  closeModalCat: () => {
    set({
      ERROR: null,
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
      isTaskUpdateOpen: false,
      ERROR: null
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
      ERROR: null
    })
  },
  color: '#ffffff',
  closeModalEditCat: () => {
    set({
      isEditCategoryOpen: false,
      categoryName: "",
      color: '#ffffff',
      ERROR: null
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
    console.log("Начало addTask");
    get().fetchCategories()
    //get().changeError(null);
    try {
      const taskData = {
        name: get().taskName,
        description: get().taskDescription,
        priority: get().taskPriority,
        category_id: parseInt(get().selectedCategoryId, 10),
        date: get().date,
      };
      console.log("Данные задачи:", taskData);
      
      const response = await addTaskApi(taskData);
      console.log("Ответ сервера:", response);
      get().changeDate(taskData.date);
      get().closeIsOpenTaskInfo();
      await get().updateTasks();
    } catch (error) {
      console.error("Ошибка в addTask:", error);
      if (error.response) {
        set({ ERROR: `Ошибка при добавлении задачи! Проверьте заполненность полей!` })
        //get().changeError(`Ошибка при добавлении задачи! Проверьте заполненность полей!`);
        console.log(get().error);
      } else if (error.request) {
        set({ ERROR: `Ошибка сети` })
        //get().changeError(`Ошибка сети`);
      } else {
        set({ERROR: `Неизвестная ошибка`})
        //get().changeError(`Неизвестная ошибка`);
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

  deleteCategory: async () => {
    if (get().token) {
      await categorieDeleteApi(get().categoryId)
      await get().fetchCategoriesNoBase()
      await get().updateCategories();
      set({ isDialogOpenForDeleteCategory: false })

    }
  },
  deleteTaskState: () => {
    set({
      isTaskOpen: false,
      taskName: "",
      taskPriority: "",
      taskDescription: "",
      date: "",
      isDialogOpenForDeleteTask: false
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
      isEditCategoryOpen: false,
      isModalCategoryOpen: false,
      ERROR: null
    })
  },

  avatarUrl: userAvatar,
  getAvatarUrl: async () => {
    const response = await getAvatarData(get().userData.id);
    if (response) {
      return `https://api.energy-cerber.ru/static/avatars/${get().userData.id}.webp`;
    } else {
      return userAvatar;
    }
  },

  loadAvatar: async () => {
    const url = await get().getAvatarUrl();
    set({avatarUrl: url})
  },

  UpdateUserInfo: async (name, surname, gender) => {
    //get().changeError(null)
    if (get().token) {
      try {
        const response = await UserEditApi({ name, surname, gender })
        get().fetchUserData()
        set({ERROR: null})
      }
      catch (error) {
        if (error.response) {
          set({ ERROR: `Ошибка при обновлении данных пользователя. Длина имени и фамилии от 2 символов!` })
          //get().changeError(`Ошибка при обновлении данных пользователя. Длина имени и фамилии от 2 символов!`)
        }
        else if (error.request) {
          set({ ERROR: `Ошибка сети` })
          //get().changeError(`Ошибка сети`)
        }
      }
    }
  },

  UpdateCallBack: () => {

    if (get().token) {
      fetchUserName();
    }
  },

  handleFileChange: async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);
      try {
        const response = await addAvatarApi(formData)
        window.location.reload();
      }
      catch (error) {
        console.log("error_avatar")
      }
    } 
  }
}));

export default useStore;