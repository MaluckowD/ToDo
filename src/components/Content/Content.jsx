import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import Header from "./Header/Header"
import Main from "./Main/Main"
import Footer from "./Footer/Footer"
import KirillLoh from '../Modals/KirillLoh/KirillLoh';
import AddTask from '../Modals/AddTask/AddTask';
import s from "./Content.module.css"
import { categoriesInfo, fetchCategoriesApi, addTaskApi, addCategoryApi, editCategoryApi, taskInfoApi, editTaskApi, deleteTaskApi, changeTaskStatusApi } from "../../api/api"
import Confirnation from "../Modals/Confirmation";
const Content = (props) => {
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [error, setError] = useState(null);
  const token = props.getToken()
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [isOpenTaskInfo, setOpenTaskInfo] = useState(false);
  const [isModalCategoryOpen, setIsModalCategoryOpen] = useState(false);
  const [isEditCategoryOpen, setIsEditModalCategoryOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [isTaskUpdateOpen, setIsTaskUpdateOpen] = useState(false);
  const [isTaskInfoOpen, setisTaskInfoOpen] = useState(false);
  const TaskInfoOpen = () => setisTaskInfoOpen(true)
  const [isWarningOpen, setIsWarningOpen] = useState(false)
  const exitWarning = () => {
    setIsWarningOpen(false)
  }

  const openWarning = () => {
    setIsWarningOpen(true)
    closeIsOpenTask()
  }
  const closeTaskInfoOpen = () => setisTaskInfoOpen(false)
  const TaskUpdateOpen = () => setIsTaskUpdateOpen(true)
  const closeTaskUpdateOpen = () => setIsTaskUpdateOpen(false)

  const CloseTaskUpdateOpen = () => {
    closeTaskUpdateOpen()
    TaskInfoOpen()
    setError(null); 
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const closeModalCat = () => {
    setIsModalCategoryOpen(false)
    setError(null); 
  };
  const [categoryName, setCategoryName] = useState("");
  const [categoryColor, setCategoryColor] = useState('#ffffff')
  const [categoryId, setcategoryId] = useState(0);
  const openModalCategory = () => setIsModalCategoryOpen(true);
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
  const [date, setDate] = useState("")
  const [taskId, setTaskId] = useState(0)
  const [taskName, setTaskName] = useState("")
  const [taskDescription, setTaskDescription] = useState("")
  const [taskPriority, setTaskPriority] = useState(1)
  const [color, setColor] = useState('#ffffff');
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const navigate = useNavigate();

  const getInitialStatusId1 = () => {
    const storedStatusId = localStorage.getItem('statusId');
    return storedStatusId ? parseInt(storedStatusId) : 0;
  };
  const getInitialCompleted1 = () => {
    const storedCompleted = localStorage.getItem('completed');
    console.log(storedCompleted)
  };
  const [completed, setCompleted] = useState(getInitialCompleted1());
  const [statusId, setStatusId] = useState(getInitialStatusId1());
  useEffect(() => {
    localStorage.setItem('statusId', statusId);
  }, [statusId]);
  useEffect(() => {
    localStorage.setItem('completed', JSON.stringify(completed));
  }, [completed]);

  const closeModalEditCat = () => {
    setIsEditModalCategoryOpen(false);
    setCategoryName("")
    setColor("#ffffff")
    setError(null); 
  }

  const openModalEditCategory = (id) => {
    setcategoryId(id)
    setIsEditModalCategoryOpen(true)
    categoriesInfo(id).then( response => {
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
        }
      )
    } catch (error) {
      console.error("Ошибка при загрузке категорий:", error);
    }
  };

  useEffect( () => {
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
  const modalRef = useRef(null);

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

  const handleCategoryChange = (event) => {
    setSelectedCategoryId(event.target.value);
  };

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
      await props.updateTasks();
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
        color: categoryColor,
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

  const EditCategory = async (id) => {
    setError(null);
    try {
      const categoryData = {
        name: categoryName,
        color: categoryColor,
      };
      await editCategoryApi(id, categoryData)
      props.updateCategories();
      await fetchCategories();
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
      let categoryName = "";
      try {
        const categoryResponse = await categoriesInfo(statusId)
        categoryName = categoryResponse.data.name
      } catch (e) {
        console.error("ошибка при получении имени категории", e)
      }
      setDate(taskData.date);
      setTaskName(taskData.name);
      setTaskDescription(taskData.description);
      setTaskPriority(taskData.priority);
      setSelectedCategoryId(categoryId);
      setcategoryId(categoryId);
      setSelectedCategoryName(categoryName);
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
    setCategoryColor(event.target.value);
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
      const response = await editTaskApi(id, taskData)
      await props.updateTasks();
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
    deleteTaskApi(id).then( response => {
      props.updateTasks()
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
      console.log(props.taskStatuses)
      props.updateTasks();
    } catch (error) {
      console.error('Ошибка при изменении статуса задачи:', error);
    }
  };

  const handlePriorityChange = (e) => {
    setTaskPriority(parseInt(e.target.value, 10));
  };

  const getTaskStatus = (taskId) => {
    return props.taskStatuses[taskId] || { completed: false, statusId: 0 };
  };

  return(
    <div className = {s.root}>
      {isModalOpen && ( <KirillLoh modalRef = {modalRef} closeModal = {closeModal}/> )}

      {isOpenTaskInfo && (
        <AddTask modalRef = {modalRef} taskName = {taskName} setTaskName = {setTaskName}
        taskDescription = {taskDescription} setTaskDescription = {setTaskDescription}
        date = {date} setDate = {setDate} handleCategoryChange = {handleCategoryChange}
          categories={categories} taskPriority={taskPriority} handlePriorityChange={handlePriorityChange} error={error} closeIsOpenTaskInfo={closeIsOpenTaskInfo}
          addTask={addTask} selectedCategoryId={selectedCategoryId}/>
      )}

      {isTaskOpen && (
        <div className={[s.modal, s.modal_categoryAdd].join(" ")} ref={modalRef}>
          <div className={s.modalcontent}>
            <button className={s.closeModalCategory} onClick={TaskInfoOpen}>
              Подробная информация
            </button>
            <button className={s.closeModalCategory} onClick={TaskUpdateOpen}>
              Редактировать задачу
            </button>
            <button className={s.closeModalCategory} onClick={() => changeTaskStatus(taskId)}>
              Изменить статус
            </button>
            <button className={s.closeModalCategory} onClick={openWarning}>
              Удалить задачу
            </button>
            <button className={s.closeModalCategory} onClick={closeIsOpenTask}>Выйти</button>
          </div>
        </div>
      )}

      {isTaskInfoOpen && (
        <div className={s.modal} ref={modalRef}>
          <div className={s.modalcontent}>
            <input className={s.categoryName}
              maxlength='50'
              disabled
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Введите название для задачи"
            />
            <textarea className={s.taskDescription}
              maxlength='500'
              disabled
              type="text"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Описание"
            />
            <input className={[s.categoryName, s.taskdate].join(" ")}
              disabled
              style={
                { color: "#000" }
              }
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Дата задачи"
            />
            <select className={s.taskinfo} disabled style={
              { color: "#000" }
            } value={selectedCategoryId} onChange={handleCategoryChange}>
              <option disabled value="">Выберите категорию</option>
              {categories.map((category) => (
                <option style={{ backgroundColor: category.color }} key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <select disabled
              className={s.taskinfo}
              style={{ color: "#000" }}
              value={taskPriority}
              onChange={handlePriorityChange}
            >
              <option disabled value="">Выберите приоритет</option>
              <option style={{ backgroundColor: "#EB0000" }} value={1}>Высокий</option>
              <option style={{ backgroundColor: "#E8E230" }} value={2}>Средний</option>
              <option style={{ backgroundColor: "#3FAB30" }} value={3}>Низкий</option>
            </select>
            <input className={s.categoryName}
              style={{ textAlign: "center" }}
              type="text"
              disabled
              value={completed ? "Выполнена" : "Не выполнена"}
            />
            <button className={s.closeModalCategory} onClick={closeTaskInfoOpen}>Выйти</button>
          </div>
        </div>
      )}


      {isTaskUpdateOpen && (
        <div className={[s.modal,s.editTask].join(" ")} ref={modalRef}>
          <div className={s.modalcontent}>
            
            <input className={s.categoryName}
              maxlength='50'
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Введите название для задачи"
            />
            <textarea className={s.taskDescription}
              maxlength='500'
              type="text"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Описание"
            />
            <input className={s.categoryName}
              style={
                { color: "#000" }
              }
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Дата задачи"
            />
            <select style={
              { color: "#000" }
            } value={selectedCategoryId} onChange={handleCategoryChange}>
              <option disabled value="">Выберите категорию</option>
              {categories.map((category) => (
                <option style={{ backgroundColor: category.color }} key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <select
              style={{ color: "#000" }}
              value={taskPriority}
              onChange={handlePriorityChange}
            >
              <option disabled value="">Выберите приоритет</option>
              <option style={{ backgroundColor: "#EB0000" }} value={1}>Высокий</option>
              <option style={{ backgroundColor: "#E8E230" }} value={2}>Средний</option>
              <option style={{ backgroundColor: "#3FAB30" }} value={3}>Низкий</option>
            </select>
            <input className={s.categoryName}
              style={{ textAlign: "center" }}
              type="text"
              disabled
              value={completed ? "Выполнена" : "Не выполнена"}
            />
            {error && <p style={{ width: "400px", marginBottom: "10px" }} className="text-red-500 text-center">{error}</p>}
            <button className={s.closeModalCategory} onClick={() => changeTask(taskId)}>Сохранить изменения</button>
            <button className={s.closeModalCategory} onClick={CloseTaskUpdateOpen}>Отменить изменения</button>
          </div>
        </div>
      )}

      
      {isModalCategoryOpen&& (
        <div className={[s.modal, s.modal_categoryAdd].join(" ")} ref={modalRef}>
          <div className={s.modalcontent}>

            
            <input className= {[s.categoryName, s.categoryNamemodificate].join(" ")}
              maxlength='50'
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Введите название категории" 
            />

            <h2 className={s.description_color}>Выберите цвет</h2>
            <input
              type="color"
              id="colorPicker"
              value={color}
              onChange={handleColorChange}
            />
            {error && <p style={{ width: "400px", marginBottom: "10px" }} className="text-red-500 text-center">{error}</p>}
            <button className={s.closeModalCategory} onClick={closeModalCategory}>Добавить категорию</button>
            <button className={s.closeModalCategory} onClick={closeModalCat}>Выйти</button>
          </div>
        </div>
      )}

      {isEditCategoryOpen && (
        <div className={[s.modal, s.modal_categoryAdd].join(" ")} ref={modalRef}>
          <div className={s.modalcontent}>
            
            <input className={[s.categoryName, s.categoryNamemodificate].join(" ")}
              maxlength='50'
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Введите название категории"
            />

            <h2 className={s.description_color}>Выберите цвет</h2>
            <input
              type="color"
              id="colorPicker"
              value={color}
              onChange={handleColorChange}
            />

            {error && <p style={{ width: "350px", marginBottom: "10px" }} className="text-red-500 text-center">{error}</p>}
            <button className={s.closeModalCategory} onClick={() => EditCategory(categoryId)}>Редактировать</button>
            <button className={s.closeModalCategory} onClick={closeModalEditCat}>Выйти</button>
          </div>
        </div>
      )}
      {isWarningOpen && (
        <Confirnation exit={exitWarning} DeleteUser={() => deleteTask(taskId)} />
      )}
      
      <div className={isWarningOpen || isModalOpen || isModalCategoryOpen || isEditCategoryOpen || isTaskOpen || isOpenTaskInfo ? [s.wrapper, s.opacity].join(' ') : [s.wrapper]}>
        <Header removeToken={props.removeToken} getToken={props.getToken} name={props.userData.name} />
        <Main updateTasks={props.updateTasks} getTaskStatus={getTaskStatus} taskStatuses={props.taskStatuses} removeToken={props.removeToken} statusId={statusId} completed={completed} getTaskInfo={getTaskInfo} fetchCategories={fetchCategories} openTaskInfo={openTaskInfo} addTask={props.addTask} tasks = {props.tasks} openModalEditCategory={openModalEditCategory} updateCategories={props.updateCategories} openModalCategory={openModalCategory} categories={props.categories} name={props.userData.name} surname={props.userData.surname} gender={props.userData.gender} getToken={props.getToken} userData={props.userData} updateUserDataInApp={props.updateUserDataInApp}/>
        <Footer openModal={openModal} />
      </div>
    </div>
  )
}

export default Content