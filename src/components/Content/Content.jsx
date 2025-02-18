import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import Header from "./Header/Header"
import Main from "./Main/Main"
import Footer from "./Footer/Footer.tsx"
import KirillLoh from '../Modals/KirillLoh/KirillLoh';
import AddTask from '../Modals/AddTask/AddTask';
import TaskVariants from '../Modals/TaskVariants/TaskVariants';
import s from "./Content.module.css"
import { categoriesInfo, fetchCategoriesApi, addTaskApi, addCategoryApi, editCategoryApi, taskInfoApi, editTaskApi, deleteTaskApi, changeTaskStatusApi } from "../../api/api.ts"
import Confirnation from "../Modals/Confirmation";
import AboutTask from '../Modals/AboutTask/AboutTask';
import EditTask from '../Modals/EditTask/EditTask';
import AddCategory from '../Modals/AddCategory/AddCategory';
import EditCategory from '../Modals/EditCategory/EditCategory';
import useStore from "../../store/useToDoStore.js";
const Content = (props) => {
  const userData = useStore((state) => state.userData);
  const updateTasks = useStore((state) => state.updateTasks)
  const taskStatuses = useStore((state) => state.taskStatuses);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [isOpenTaskInfo, setOpenTaskInfo] = useState(false);
  const [isModalCategoryOpen, setIsModalCategoryOpen] = useState(false);
  const [isEditCategoryOpen, setIsEditModalCategoryOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [isTaskUpdateOpen, setIsTaskUpdateOpen] = useState(false);
  const [isTaskInfoOpen, setisTaskInfoOpen] = useState(false);
  const [isWarningOpen, setIsWarningOpen] = useState(false)
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setcategoryId] = useState(0);
  const [date, setDate] = useState("")
  const [taskId, setTaskId] = useState(0)
  const [taskName, setTaskName] = useState("")
  const [taskDescription, setTaskDescription] = useState("")
  const [taskPriority, setTaskPriority] = useState(1)
  const [color, setColor] = useState('#ffffff');
  const TaskInfoOpen = () => setisTaskInfoOpen(true)
  const exitWarning = () => setIsWarningOpen(false)
  const closeTaskInfoOpen = () => setisTaskInfoOpen(false)
  const TaskUpdateOpen = () => setIsTaskUpdateOpen(true)
  const closeTaskUpdateOpen = () => setIsTaskUpdateOpen(false)
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openModalCategory = () => setIsModalCategoryOpen(true);
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const openWarning = () => {
    setIsWarningOpen(true)
    closeIsOpenTask()
  }
  const CloseTaskUpdateOpen = () => {
    closeTaskUpdateOpen()
    TaskInfoOpen()
    setError(null);
  }
  const closeModalCat = () => {
    setIsModalCategoryOpen(false)
    setError(null);
  };
  const closeIsOpenTaskInfo = () => {
    setOpenTaskInfo(false)
    setTaskName("");
    setTaskDescription("");
    setTaskPriority("");
    setCategoryName("")
    setDate("")
    setError(null);
  };
  const closeIsOpenTask = () => {
    setIsTaskOpen(false)
    setTaskName("");
    setTaskDescription("");
    setTaskPriority("");
    setSelectedCategoryId("")
    setDate("")
  }
  const closeModalEditCat = () => {
    setIsEditModalCategoryOpen(false);
    setCategoryName("")
    setColor("#ffffff")
    setError(null);
  }

  // const updateAvatarId = (newAvatarId) => {
  //   setAvatarId(newAvatarId);
  // };

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

  const openModalEditCategory = (id) => {
    setcategoryId(id)
    setIsEditModalCategoryOpen(true)
    categoriesInfo(id).then(response => {
      setCategoryName(response.name)
      setColor(response.color)
    }).catch(error => {
      console.error("Ошибка при получении информации о категории:", error);
    });
  };

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
    setDate(formattedDate);
    setOpenTaskInfo(true);
  };

  const fetchCategories = async () => {
    try {
      fetchCategoriesApi().then(
        response => {
          setCategories(response);
          console.log(response)
        }
      )
    } catch (error) {
      console.error("Ошибка при загрузке категорий:", error);
    }
  };

  useEffect(() => {
    if (props.getToken()) {
      fetchCategories()
    }
  }, [props.getToken()])

  useEffect(() => {
    if (!props.getToken() && !redirectToLogin) {
      setRedirectToLogin(true);
    }
  }, [props.getToken(), redirectToLogin]);

  useEffect(() => {
    if (redirectToLogin) {
      navigate('/login');
    }
  }, [redirectToLogin, navigate])

  const addTask = async () => {
    setError(null);
    try {
      const taskData = {
        name: taskName,
        description: taskDescription,
        priority: taskPriority,
        category_id: parseInt(selectedCategoryId, 10),
        date: date,
      };
      await addTaskApi(taskData)
      await updateTasks();
      closeIsOpenTaskInfo();
      setDate(taskData.date);
      setTaskName("");
      setTaskDescription("");
      setTaskPriority("");
      setSelectedCategoryId("");
    }
    catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
      if (error.response) {
        setError(`Ошибка при добавлении задачи! Проверьте заполненность полей!`);
      } else if (error.request) {
        setError(`Ошибка сети`)
      }
    }
  };

  const closeModalCategory = async () => {
    setError(null);
    try {
      const categoryData = {
        name: categoryName,
        color: color,
      };
      await addCategoryApi(categoryData)
      props.updateCategories();
      await fetchCategories();
      setCategoryName("");
      setColor("#ffffff");
      setIsModalCategoryOpen(false);
    } catch (error) {
      console.error("Ошибка при создании категории:", error);
      if (error.response) {
        setError("Ошибка при создании категории. Проверьте заполненность полей");
      } else if (error.request) {
        setError(`Ошибка сети`)
      }
    }
  };

  const onEditCategory = async (id) => {
    setError(null);
    try {
      const categoryData = {
        name: categoryName,
        color: color,
      };
      await editCategoryApi(id, categoryData)
      props.updateCategories();
      await fetchCategories();
      setCategoryName("");
      setColor("#ffffff");
      setIsEditModalCategoryOpen(false);
    } catch (error) {
      console.error('Ошибка при редактировании категории:', error);
      if (error.response) {
        setError(`Ошибка при редактировании. Проверьте заполнение полей!`);
      }
      else if (error.request) {
        setError(`Ошибка сети`)
      }
    }
  };

  const getTaskInfo = async (id) => {
    try {
      const taskResponse = await taskInfoApi(id)
      const taskData = taskResponse;
      const categoryId = taskData.category_id;
      setTaskId(taskData.id)
      setCompleted(taskData.completed)
      try {
        await categoriesInfo(statusId)
      } catch (e) {
        console.error("ошибка при получении имени категории", e)
      }
      setDate(taskData.date);
      setTaskName(taskData.name);
      setTaskDescription(taskData.description);
      setTaskPriority(taskData.priority);
      setSelectedCategoryId(categoryId);
      setcategoryId(categoryId);
      setIsTaskOpen(true);
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

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const changeTask = async (id) => {
    setError(null);
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
        setError(`Ошибка при изменении задачи! Проверьте заполненность полей!`);
      }
      else if (error.request) {
        setError(`Ошибка сети`)
      }
    }
  };

  const deleteTask = (id) => {
    deleteTaskApi(id).then(response => {
      updateTasks()
      setIsTaskOpen(false)
      setTaskName("");
      setTaskDescription("");
      setTaskPriority("");
      setCategoryName("")
      setDate("")
      setIsWarningOpen(false)
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
      const newTaskStatuses = { ...taskStatuses };
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

  const handlePriorityChange = (e) => {
    setTaskPriority(parseInt(e.target.value, 10));
  };
  const handleCategoryChange = (event) => {
    setSelectedCategoryId(event.target.value);
  };

  const getTaskStatus = (taskId) => {
    return taskStatuses[taskId] || { completed: false, statusId: 0 };
  };
  console.log(userData)
  if (!userData.name) {
    return <div>Загрузка данных пользователя...</div>;
  }
  return (
    <div className={s.root}>
      {isModalOpen && (<KirillLoh modalRef={modalRef} closeModal={closeModal} />)}

      {isOpenTaskInfo && (
        <AddTask modalRef={modalRef} taskName={taskName} setTaskName={setTaskName}
          taskDescription={taskDescription} setTaskDescription={setTaskDescription}
          date={date} setDate={setDate} handleCategoryChange={handleCategoryChange}
          categories={categories} taskPriority={taskPriority} handlePriorityChange={handlePriorityChange} error={error} closeIsOpenTaskInfo={closeIsOpenTaskInfo}
          addTask={addTask} selectedCategoryId={selectedCategoryId} />
      )}

      {isTaskOpen && (
        <TaskVariants modalRef={modalRef} TaskInfoOpen={TaskInfoOpen} TaskUpdateOpen={TaskUpdateOpen} changeTaskStatus={changeTaskStatus} taskId={taskId}
          openWarning={openWarning} closeIsOpenTask={closeIsOpenTask} />
      )}
      {isTaskInfoOpen && (
        <AboutTask modalRef={modalRef} taskName={taskName} setTaskName={setTaskName}
          taskDescription={taskDescription} setTaskDescription={setTaskDescription}
          date={date} setDate={setDate} selectedCategoryId={selectedCategoryId}
          handleCategoryChange={handleCategoryChange} taskPriority={taskPriority}
          handlePriorityChange={handlePriorityChange} completed={completed}
          closeTaskInfoOpen={closeTaskInfoOpen} categories={categories} />
      )}

      {isTaskUpdateOpen && (
        <EditTask modalRef={modalRef} taskName={taskName} setTaskName={setTaskName}
          taskDescription={taskDescription} setTaskDescription={setTaskDescription}
          date={date} setDate={setDate} selectedCategoryId={selectedCategoryId}
          handleCategoryChange={handleCategoryChange} categories={categories}
          completed={completed} error={error} changeTask={changeTask} taskId={taskId}
          CloseTaskUpdateOpen={CloseTaskUpdateOpen} />
      )}

      {isModalCategoryOpen && (
        <AddCategory modalRef={modalRef} categoryName={categoryName} setCategoryName={setCategoryName} color={color} handleColorChange={handleColorChange} error={error} closeModalCategory={closeModalCategory} closeModalCat={closeModalCat} />
      )}

      {isEditCategoryOpen && (
        <EditCategory modalRef={modalRef} categoryName={categoryName} setCategoryName={setCategoryName} color={color} handleColorChange={handleColorChange}
          error={error} onEditCategory={onEditCategory} categoryId={categoryId} closeModalEditCat={closeModalEditCat} />
      )}

      {isWarningOpen && (
        <Confirnation exit={exitWarning} DeleteUser={() => deleteTask(taskId)} />
      )}

      <div className={isWarningOpen || isModalOpen || isModalCategoryOpen || isEditCategoryOpen || isTaskOpen || isOpenTaskInfo ? [s.wrapper, s.opacity].join(' ') : [s.wrapper]}>
        <Header avatarId={props.userData.id} removeToken={props.removeToken} getToken={props.getToken} name={props.userData.name} />
        <Main updateAvatarId={props.userData.id} avatarId={props.userData.id} getTaskStatus={getTaskStatus} removeToken={props.removeToken} statusId={statusId} completed={completed} getTaskInfo={getTaskInfo} fetchCategories={fetchCategories} openTaskInfo={openTaskInfo} addTask={props.addTask} openModalEditCategory={openModalEditCategory} updateCategories={props.updateCategories} openModalCategory={openModalCategory} categories={props.categories} name={props.userData.name} surname={props.userData.surname} gender={props.userData.gender} getToken={props.getToken} userData={props.userData} updateUserDataInApp={props.updateUserDataInApp} />
        <Footer openModal={openModal} />
      </div>
    </div>
  )
}

export default Content