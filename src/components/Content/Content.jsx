import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import Header from "./Header/Header"
import Main from "./Main/Main"
import Footer from "./Footer/Footer"
import KirillLoh from '../Modals/KirillLoh/KirillLoh';
import AddTask from '../Modals/AddTask/AddTask';
import TaskVariants from '../Modals/TaskVariants/TaskVariants';
import s from "./Content.module.css"
import { categoriesInfo, addTaskApi, addCategoryApi, editCategoryApi, taskInfoApi, editTaskApi, deleteTaskApi, changeTaskStatusApi } from "../../api/api.ts"
import Confirnation from "../Modals/Confirmation";
import AboutTask from '../Modals/AboutTask/AboutTask';
import EditTask from '../Modals/EditTask/EditTask';
import AddCategory from '../Modals/AddCategory/AddCategory';
import EditCategory from '../Modals/EditCategory/EditCategory';
import useStore from "../../store/useToDoStore.js";

const Content = (props) => {
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const error = useStore((state) => state.error);
  const changeError = useStore((state) => state.changeError);

  const isTaskUpdateOpen = useStore((state) => state.isTaskUpdateOpen);
  const isTaskInfoOpen = useStore((state) => state.isTaskInfoOpen);
  
  const [taskId, setTaskId] = useState(0)

  const TaskInfoOpen = useStore((state) => state.TaskInfoOpen);
  const closeTaskInfoOpen = useStore((state) => state.closeTaskInfoOpen);
  const closeTaskUpdateOpen = useStore((state) => state.closeTaskUpdateOpen);

  const fetchCategories = useStore((state) => state.fetchCategories);
  const isModalOpen = useStore((state) => state.isModalOpen);
  const closeModal = useStore((state) => state.closeModal);
  const isOpenTaskInfo = useStore((state) => state.isOpenTaskInfo);
  const openTaskInfoState = useStore((state) => state.openTaskInfoState);
  const isWarningOpen = useStore((state) => state.isWarningOpen);
  const closeIsOpenTask = useStore((state) => state.closeIsOpenTask);
  const isTaskOpen = useStore((state) => state.isTaskOpen);
  const taskName = useStore((state) => state.taskName);
  const taskDescription = useStore((state) => state.taskDescription);
  const taskPriority = useStore((state) => state.taskPriority);
  const selectedCategoryId = useStore((state) => state.selectedCategoryId);
  const date = useStore((state) => state.date)
  const changeDate = useStore((state) => state.changeDate)
  const isModalCategoryOpen = useStore((state) => state.isModalCategoryOpen)
  const closeIsOpenTaskInfo = useStore((state) => state.closeIsOpenTaskInfo)
  const getTaskInfoState = useStore((state) => state.getTaskInfoState)
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const token = useStore((state) => state.token);
  const deleteTaskState = useStore((state) => state.deleteTaskState);
  const closeModalCat = useStore((state) => state.closeModalCat);
  const categoryName = useStore((state) => state.categoryName);
  const deleteTasks = useStore((state) => state.deleteTasks);
  const changeCategoryNameState = useStore((state) => state.changeCategoryNameState);
  const isEditCategoryOpen = useStore((state) => state.isEditCategoryOpen);

  const closeModalCategoryState = useStore((state) => state.closeModalCategoryState);
  const closeModalEditCat = useStore((state) => state.closeModalEditCat);
  const updateTasks = useStore((state) => state.updateTasks);
  const color = useStore((state) => state.color);

  const changeTaskId = useStore((state) => state.changeTaskId);
  const CloseTaskUpdateOpen = () => {
    closeTaskUpdateOpen()
    TaskInfoOpen()
    changeError(null)
  }


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModalCat();
        closeModal();
        closeModalEditCat();
        closeIsOpenTaskInfo();
        closeIsOpenTask();
        closeTaskInfoOpen()
        closeTaskUpdateOpen()
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };

  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModalCat();
        closeModal();
        closeModalEditCat();
        closeIsOpenTaskInfo();
        closeIsOpenTask();
        closeTaskInfoOpen()
        closeTaskUpdateOpen()
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  const getInitialStatusId1 = () => {
    const storedStatusId = localStorage.getItem('statusId');
    return storedStatusId ? parseInt(storedStatusId) : 0;
  };
  const getInitialCompleted1 = () => {
    const storedCompleted = localStorage.getItem('completed');
  };
  const [completed, setCompleted] = useState(getInitialCompleted1());
  const [statusId, setStatusId] = useState(getInitialStatusId1());

  useEffect(() => {
    localStorage.setItem('statusId', statusId);
  }, [statusId]);
  useEffect(() => {
    localStorage.setItem('completed', JSON.stringify(completed));
  }, [completed]);


  const openTaskInfo = (e) => {
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
    openTaskInfoState(formattedDate)
  };


  
  useEffect(() => {
    if (token) {
      fetchCategories()
    }
  }, [token])

  useEffect(() => {
    if (!token && !redirectToLogin) {
      setRedirectToLogin(true);
    }
  }, [token, redirectToLogin]);

  useEffect(() => {
    if (redirectToLogin) {
      navigate('/login');
    }
  }, [redirectToLogin, navigate])

  const addTask = async () => {
    changeError(null)
    try {
      const taskData = {
        name: taskName,
        description: taskDescription,
        priority: taskPriority,
        category_id: parseInt(selectedCategoryId, 10),
        date: date,
      };
      console.log(taskData)
      await addTaskApi(taskData)
      await updateTasks();
      closeIsOpenTaskInfo();
      changeDate(taskData.date)
    }
    catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
      if (error.response) {
        changeError(`Ошибка при добавлении задачи! Проверьте заполненность полей!`)
      } else if (error.request) {
        changeError(`Ошибка сети`)
      }
    }
  };

  const closeModalCategory = async () => {
    changeError(null)
    try {
      const categoryData = {
        name: categoryName,
        color: color,
      };
      await addCategoryApi(categoryData)
      props.updateCategories();
      await fetchCategories();
      closeModalCategoryState()
    } catch (error) {
      console.error("Ошибка при создании категории:", error);
      if (error.response) {
        changeError("Ошибка при создании категории. Проверьте заполненность полей")
      } else if (error.request) {
        changeError(`Ошибка сети`)
      }
    }
  };

  const onEditCategory = async (id) => {
    changeError(null)
    try {
      const categoryData = {
        name: categoryName,
        color: color,
      };
      console.log(categoryData)
      await editCategoryApi(id, categoryData)
      props.updateCategories();
      await fetchCategories();
      closeModalCategoryState()
    } catch (error) {
      console.error('Ошибка при редактировании категории:', error);
      if (error.response) {
        changeError(`Ошибка при редактировании. Проверьте заполнение полей!`)
      }
      else if (error.request) {
        changeError(`Ошибка сети`)
      }
    }
  };

  const getTaskInfo = async (id) => {
    try {
      const taskResponse = await taskInfoApi(id)
      const taskData = taskResponse;
      const categoryId = taskData.category_id;
      changeTaskId(taskData.id)
      setCompleted(taskData.completed)
      try {
        await categoriesInfo(statusId)
      } catch (e) {
        console.error("ошибка при получении имени категории", e)
      }
      getTaskInfoState(taskData, categoryId)
    } catch (error) {
      console.error("Ошибка при получении данных задачи:", error);
    }
  };

  if (props.isLoading) {
    return <p>Загрузка данных...</p>;
  }

  if (props.error) {
    return <p>Ошибка: {props.error.message}</p>;
  }

  const changeTask = async (id) => {
    changeError(null)
    try {
      const taskData = {
        name: taskName,
        description: taskDescription,
        priority: taskPriority,
        category_id: parseInt(selectedCategoryId, 10),
        date: date,
      };
      await editTaskApi(id, taskData)
      await updateTasks();
      closeTaskUpdateOpen();
      TaskInfoOpen();
    } catch (error) {
      console.error("Ошибка при изменении задачи:", error);
      if (error.response) {
        changeError(`Ошибка при изменении задачи! Проверьте заполненность полей!`)
      }
      else if (error.request) {
        changeError(`Ошибка сети`)
      }
    }
  };

  const deleteTask = (id) => {
    deleteTaskApi(id).then(response => {
      updateTasks()
      deleteTaskState()
      changeCategoryNameState("")
    })
  }

  const changeTaskStatus = async (id) => {
    const taskData = {
      name: taskName,
      description: taskDescription,
      priority: taskPriority,
      category_id: parseInt(selectedCategoryId, 10),
      date: date
    }
    try {
      const response = await changeTaskStatusApi(id, taskData)
      const newTaskStatuses = { ...props.taskStatuses };
      if (response.completed === true) {
        setCompleted(true)
        newTaskStatuses[id] = {
          completed: true,
          statusId: id,
        }
        localStorage.setItem(`completed_${id}`, JSON.stringify(true));
        localStorage.setItem(`statusId_${id}`, id);
      } else {
        setCompleted(false)
        newTaskStatuses[id] = {
          completed: false,
          statusId: id,
        }
        localStorage.setItem(`completed_${id}`, JSON.stringify(false));
        localStorage.setItem(`statusId_${id}`, id);
      }
      props.setTaskStatuses(newTaskStatuses);
      updateTasks();
    } catch (error) {
      console.error('Ошибка при изменении статуса задачи:', error);
    }
  };

  const getTaskStatus = (taskId) => {
    return props.taskStatuses[taskId] || { completed: false, statusId: 0 };
  };
  console.log(props.userData)
  if (!props.userData.name) {
    return <div>Загрузка данных пользователя...</div>;
  }
  return (
    <div className={s.root}>
      {isModalOpen && (<KirillLoh modalRef={modalRef} />)}

      {isOpenTaskInfo && ( <AddTask modalRef={modalRef} addTask={addTask}/>)}

      {isTaskOpen && (
        <TaskVariants modalRef={modalRef} changeTaskStatus={changeTaskStatus} taskId={taskId}/>
      )}
      {isTaskInfoOpen && ( <AboutTask modalRef={modalRef} completed={completed}/>)}

      {isTaskUpdateOpen && (
        <EditTask modalRef={modalRef} 
          completed={completed} changeTask={changeTask}/>
      )}

      {isModalCategoryOpen && (
        <AddCategory modalRef={modalRef} closeModalCategory={closeModalCategory}/>)}

      {isEditCategoryOpen && ( <EditCategory modalRef={modalRef} onEditCategory={onEditCategory}/>
      )}

      {isWarningOpen && ( <Confirnation/> )}

      <div className={isWarningOpen || isModalOpen || isModalCategoryOpen || isEditCategoryOpen || isTaskOpen || isOpenTaskInfo ? [s.wrapper, s.opacity].join(' ') : [s.wrapper]}>
        <Header avatarId={props.userData.id} name={props.userData.name} />
        <Main updateAvatarId={props.userData.id} avatarId={props.userData.id}  getTaskStatus={getTaskStatus} taskStatuses={props.taskStatuses} statusId={statusId} completed={completed} getTaskInfo={getTaskInfo} fetchCategories={fetchCategories} openTaskInfo={openTaskInfo} addTask={props.addTask} tasks={props.tasks} updateCategories={props.updateCategories} categories={props.categories} name={props.userData.name} surname={props.userData.surname} gender={props.userData.gender} userData={props.userData} updateUserDataInApp={props.updateUserDataInApp} />
        <Footer />
      </div>
    </div>
  )
}

export default Content