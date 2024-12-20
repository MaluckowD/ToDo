import Header from "./Header/Header"
import Main from "./Main/Main"
import Footer from "./Footer/Footer"
import s from "./Content.module.css"
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Kirillloh from "../../images/Кирилл2.jpg"
import Ville from "../../images/Vinne.jpg"
const Content = (props) => {
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const token = props.getToken()
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [isOpenTaskInfo, setOpenTaskInfo] = useState(false);
  const [isModalCategoryOpen, setIsModalCategoryOpen] = useState(false);
  const [isEditCategoryOpen, setIsEditModalCategoryOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const closeModalCat = () => setIsModalCategoryOpen(false);
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

  const getInitialStatusId = () => {
    const storedStatusId = localStorage.getItem('statusId');
    return storedStatusId ? parseInt(storedStatusId) : 0;
  };

  const getInitialCompleted = () => {
    const storedCompleted = localStorage.getItem('completed');
    return storedCompleted ? JSON.parse(storedCompleted) : false;
  };

  const [completed, setCompleted] = useState(getInitialCompleted());
  const [statusId, setStatusId] = useState(getInitialStatusId());

  useEffect(() => {
    localStorage.setItem('statusId', statusId);
  }, [statusId]);

  useEffect(() => {
    localStorage.setItem('completed', JSON.stringify(completed));
  }, [completed]);

  const handleTaskClick = (e) => {

    getTaskInfo(e.task_id);

  };


  const closeModalEditCat = () => {
    setIsEditModalCategoryOpen(false);
    setCategoryName("")
    setColor("#ffffff")
  }


  
  const openModalEditCategory = (id) => {
    setcategoryId(id)
    setIsEditModalCategoryOpen(true)
    axios.get(`https://api.energy-cerber.ru/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }}
    ).then( response => {
      setCategoryName(response.data.name)
      setColor(response.data.color)
    })

  };

  const openTaskInfo = (e) => {
    let dateString = e?.currentTarget?.getAttribute('data-date');

    if (!dateString) {
      // Если data-date отсутствует, устанавливаем текущую дату
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
      const response = await axios.get("https://api.energy-cerber.ru/categories/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data); // Сохраняем категории
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
    // Проверка токена при монтировании компонента или при изменении токена
    if (!token && !redirectToLogin) {
      setRedirectToLogin(true); // Инициируем перенаправление
    }
  }, [token, redirectToLogin]);

  useEffect(() => {
    if (redirectToLogin) {
      navigate('/login'); // Выполняем перенаправление только если нужно
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

  const addTask = () => {
      const taskData = {
        name: taskName,
        description: taskDescription,
        priority: taskPriority,
        category_id: parseInt(selectedCategoryId, 10),
        date: date
      }
      axios.post("https://api.energy-cerber.ru/tasks/", taskData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        console.log(response.data)
        props.updateTasks()
        closeIsOpenTaskInfo()
        setDate(taskData.date);
        setTaskName("");
        setTaskDescription("");
        setTaskPriority("");
        setCategoryName("")
        setSelectedCategoryId("")
      })
    }


  const closeModalCategory = () => {
    const categoryData = {
      name: categoryName,
      color: categoryColor
    }
    
    axios.post("https://api.energy-cerber.ru/categories/", categoryData,{
      headers: {
        Authorization: `Bearer ${token}`
      }
      }).then(response => {
        console.log(response.data)
        props.updateCategories()
        fetchCategories()
        setCategoryName("")
        setColor("#ffffff")
        setIsModalCategoryOpen(false)
      })
  }

  const EditCategory = (id) => {
    const categoryData = {
      name: categoryName,
      color: categoryColor
    }
    axios.put(`https://api.energy-cerber.ru/categories/${id}`, categoryData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      console.log(response.data)
      props.updateCategories()
      fetchCategories()
      setIsEditModalCategoryOpen(false)
    })
  }

  const getTaskInfo = async (id) => {
    try {
      const taskResponse = await axios.get(`https://api.energy-cerber.ru/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const taskData = taskResponse.data;
      console.log(taskData)
      const categoryId = taskData.category_id;
      setTaskId(taskData.id)
      setCompleted(taskData.completed)
      let categoryName = "";
      try {
        const categoryResponse = await axios.get(`https://api.energy-cerber.ru/categories/${categoryId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
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
      console.log(categoryId);
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

  const colors = 
  ["#F44336","#4CAF50","#2196F3","#FFC107","#FF9800","#9C27B0",
  "#E91E63","#795548","#9E9E9E","#212121","#FFFFFF","#00BCD4",
  "#C0CA33","#009688","#3F51B5","#673AB7","#03A9F4","#8BC34A",
  "#EEEEEE","#FFC107","#FF5722","#F48FB1"]
  const handleColorChange = (event) => {
    setColor(event.target.value);
    setCategoryColor(event.target.value);
  };
  
  const handleCompletedChange = (event) => {
    setColor(event.target.value);
    setCategoryColor(event.target.value);
  }

  const changeTask = (id) => {
    const taskData = {
      name: taskName,
      description: taskDescription,
      priority: taskPriority,
      category_id: parseInt(selectedCategoryId, 10),
      date: date
    }
    axios.put(`https://api.energy-cerber.ru/tasks/${id}`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      console.log(response.data)
      props.updateTasks()
    })
  }
  const deleteTask = (id) => {
    axios.delete(`https://api.energy-cerber.ru/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      console.log(response.data)
      const newTasks = props.tasks.filter(task => task.id !== id);
      props.updateTasks()
      setIsTaskOpen(false)
      setTaskName("");
      setTaskDescription("");
      setTaskPriority("");
      setCategoryName("")
      setDate("")
    })
  }

  const changeTaskStatus = (id) => {
    const taskData = {
      name: taskName,
      description: taskDescription,
      priority: taskPriority,
      category_id: parseInt(selectedCategoryId, 10),
      date: date
    }
    axios.put(`https://api.energy-cerber.ru/tasks/${id}/change_status`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      setStatusId(id)
      console.log(response.data)
      if (response.data.completed === true){
        setCompleted(true)
        props.updateTasks()
      }
      else{
        setCompleted(false)
        props.updateTasks()
      }
    })
  }

  const handlePriorityChange = (e) => {
    setTaskPriority(parseInt(e.target.value, 10));
  };



  return(
    <div className = {s.root}>
      {isModalOpen&& (
        <div className={[s.modal, s.Kirillloh].join(" ")} ref={modalRef}>
          <div className={s.modalcontent}>
            <img classNane={s.modalcontent_image} src={Kirillloh}></img>
            <p style = {{color: "#000"}}>КИРИЛЛ ЛОХ</p>
            <button className={s.close} onClick={closeModal}>Выйти</button>
          </div>
        </div>
      )}

      {isOpenTaskInfo && (
        <div className={s.modal} ref={modalRef}>
          <div className={s.modalcontent}>

            <input className={s.categoryName}
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Введите название для задачи"
            />

            <textarea className={s.taskDescription}
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
              <option value="" disabled>Выберите категорию</option>
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
              <option value="" disabled>Выберите приоритет</option>
              <option value={1}>Высокий</option>
              <option value={2}>Средний</option>
              <option value={3}>Низкий</option>
            </select>

            <button className={s.closeModalCategory} onClick={addTask}>
              Добавить задачу
            </button>
            <button className={s.closeModalCategory} onClick={closeIsOpenTaskInfo}>Выйти</button>
          </div>
        </div>
      )}


      {isTaskOpen && (
        <div className={s.modal} ref={modalRef}>
          <div className={s.modalcontent}>
            <select style={
              {color: "#000"}
            } value={selectedCategoryId} onChange={handleCategoryChange}>
              <option disabled value="">Выберите категорию</option>
              {categories.map((category) => (
                <option style={{ backgroundColor: category.color }} key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <h2>Название задачи</h2>
            <input className={s.categoryName}
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Введите название для задачи"
            />
            <h2>Описание</h2>
            <input className={s.categoryName}
              type="text"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Описание"
            />
            <h2>Дата</h2>
            <input className={s.categoryName}
              style={
                { color: "#000" }
              }
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Дата задачи"
            />
            <h2>Приоритет</h2>
            <select
              style={{ color: "#000" }}
              value={taskPriority}
              onChange={handlePriorityChange}
            >
              <option disabled value="">Выберите приоритет</option>
              <option value={1}>Высокий</option>
              <option value={2}>Средний</option>
              <option value={3}>Низкий</option>
            </select>
            <input className={s.categoryName}
              type="text"
              disabled
              value={completed ? "Выполнена" : "Не выполнена"}
            />

            <button className={s.closeModalCategory} onClick={() => changeTask(taskId)}>
              Изменить задачу
            </button>
            <button className={s.closeModalCategory} onClick={() => changeTaskStatus(taskId)}>
              Изменить статус выполнения
            </button>
            <button className={s.closeModalCategory} onClick={() => deleteTask(taskId)}>
              удалить задачу
            </button>
            <button className={s.closeModalCategory} onClick={closeIsOpenTask}>Выйти</button>
          </div>
        </div>
      )}

      
      {isModalCategoryOpen&& (
        <div className={[s.modal, s.modal_categoryAdd].join(" ")} ref={modalRef}>
          <div className={s.modalcontent}>

            
            <input className= {[s.categoryName, s.categoryNamemodificate].join(" ")}
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

            <button className={s.closeModalCategory} onClick={closeModalCategory}>Добавить категорию</button>
            <button className={s.closeModalCategory} onClick={closeModalCat}>Выйти</button>
          </div>
        </div>
      )}

      {isEditCategoryOpen && (
        <div className={[s.modal, s.modal_categoryAdd].join(" ")} ref={modalRef}>
          <div className={s.modalcontent}>
            
            <input className={[s.categoryName, s.categoryNamemodificate].join(" ")}
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

            
            <button className={s.closeModalCategory} onClick={() => EditCategory(categoryId)}>Редактировать</button>
            <button className={s.closeModalCategory} onClick={closeModalEditCat}>Выйти</button>
          </div>
        </div>
      )}
      
      <div className={isModalOpen || isModalCategoryOpen || isEditCategoryOpen || isTaskOpen || isOpenTaskInfo ? [s.wrapper, s.opacity].join(' ') : [s.wrapper]}>
        <Header removeToken={props.removeToken} getToken={props.getToken} name={props.userData.name} />
        <Main removeToken={props.removeToken} statusId={statusId} completed={completed} getTaskInfo={getTaskInfo} fetchCategories={fetchCategories} openTaskInfo={openTaskInfo} addTask={props.addTask} tasks = {props.tasks} openModalEditCategory={openModalEditCategory} updateCategories={props.updateCategories} openModalCategory={openModalCategory} categories={props.categories} name={props.userData.name} surname={props.userData.surname} gender={props.userData.gender} getToken={props.getToken} userData={props.userData} updateUserDataInApp={props.updateUserDataInApp}/>
        <Footer openModal={openModal} />
      </div>
    </div>
  )
}

export default Content