import Header from "./Header/Header"
import Main from "./Main/Main"
import Footer from "./Footer/Footer"
import s from "./Content.module.css"
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Kirillloh from "../../images/KirillLoh.jpg"
import Ville from "../../images/Vinne.jpg"
const Content = (props) => {
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
  const closeModalEditCat = () => setIsEditModalCategoryOpen(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryColor, setCategoryColor] = useState('#ffffff')
  const [categoryId, setcategoryId] = useState(0);
  const openModalCategory = () => setIsModalCategoryOpen(true);
  const closeIsOpenTaskInfo = () => setOpenTaskInfo(false);
  const closeIsOpenTask = () => setIsTaskOpen(false)
  const [date, setDate] = useState("")
  const [taskId, setTaskId] = useState(0)
  const [taskName, setTaskName] = useState("")
  const [taskDescription, setTaskDescription] = useState("")
  const [completed, setCompleted] = useState(false)
  const [taskPriority, setTaskPriority] = useState(1)
  const [color, setColor] = useState('#ffffff');
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const [statusText, setStatusText] = useState("Активна");


  const openModalEditCategory = (id) => {
    setcategoryId(id)
    setIsEditModalCategoryOpen(true)

  };

  const openTaskInfo = (e) => {
    const dateString = e.currentTarget.getAttribute('data-date');
    setDate(dateString)
    setOpenTaskInfo(true)
  }

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

  useEffect(() => {
    fetchCategories(); // Загружаем категории при монтировании
  }, [token]);

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
      props.updateTasks(newTasks)
      setIsTaskOpen(false)

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
      console.log(response.data)
      if (response.data.completed === true){
        setCompleted(true)
      }
      else{
        setCompleted(false)
      }
    })
  }



  return(
    <div className = {s.root}>
      {isModalOpen&& (
        <div className={s.modal}>
          <div className={s.modalcontent}>
            <img classNane={s.modalcontent_image} src={Kirillloh}></img>
            <p>КИРИЛЛ ЛОХ</p>
            <button className={s.close} onClick={closeModal}>Выйти</button>
          </div>
        </div>
      )}

      {isOpenTaskInfo && (
        <div className={s.modal}>
          <div className={s.modalcontent}>
            <select style={
              { color: "#000" }
            } value={selectedCategoryId} onChange={handleCategoryChange}>
              <option value="">Выберите категорию</option>
              {categories.map((category) => (
                <option style={{ backgroundColor: category.color }} key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <input className={s.categoryName}
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Введите название для задачи"
            />
            <input className={s.categoryName}
              type="text"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Описание"
            />
            <input className={s.categoryName}
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Дата задачи"
            />
            <input className={s.categoryName}
              type="text"
              value={taskPriority}
              onChange={(e) => setTaskPriority(parseInt(e.target.value))}
              placeholder="Приоритет"
            />

            <button className={s.closeModalCategory} onClick={addTask}>
              Добавить задачу
            </button>
            <button className={s.closeModalCategory} onClick={closeIsOpenTaskInfo}>Выйти</button>
          </div>
        </div>
      )}


      {isTaskOpen && (
        <div className={s.modal}>
          <div className={s.modalcontent}>
            <select style={
              {color: "#000"}
            } value={selectedCategoryId} onChange={handleCategoryChange}>
              <option value="">Выберите категорию</option>
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
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Дата задачи"
            />
            <h2>Приоритет</h2>
            <input className={s.categoryName}
              type="text"
              value={taskPriority}
              onChange={(e) => setTaskPriority(parseInt(e.target.value))}
              placeholder="Приоритет"
            />
            <input className={s.categoryName}
              type="text"
              disabled
              value={completed ? "Не активна" : "Активна"}
            />

            <button className={s.closeModalCategory} onClick={() => changeTask(taskId)}>
              Изменить задачу
            </button>
            <button className={s.closeModalCategory} onClick={() => changeTaskStatus(taskId)}>
              Изменить статус
            </button>
            <button className={s.closeModalCategory} onClick={() => deleteTask(taskId)}>
              удалить задачу
            </button>
            <button className={s.closeModalCategory} onClick={closeIsOpenTask}>Выйти</button>
          </div>
        </div>
      )}

      
      {isModalCategoryOpen&& (
        <div className={s.modal}>
          <div className={s.modalcontent}>
            <input
              type="color"
              id="colorPicker"
              value={color}
              onChange={handleColorChange}
            />
            
            <input className= {s.categoryName}
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Введите название категории" 
            />

            <button className={s.closeModalCategory} onClick={closeModalCategory}>Добавить категорию</button>
            <button className={s.closeModalCategory} onClick={closeModalCat}>Выйти</button>
          </div>
        </div>
      )}

      {isEditCategoryOpen && (
        <div className={s.modal}>
          <div className={s.modalcontent}>
            <input
              type="color"
              id="colorPicker"
              value={color}
              onChange={handleColorChange}
            />
            <input className={s.categoryName}
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Введите название категории"
            />

            
            <button className={s.closeModalCategory} onClick={() => EditCategory(categoryId)}>Редактировать</button>
            <button className={s.closeModalCategory} onClick={closeModalEditCat}>Выйти</button>
          </div>
        </div>
      )}
      
      <div className={isModalOpen || isModalCategoryOpen || isEditCategoryOpen ? [s.wrapper, s.opacity].join(' ') : s.wrapper}>
        <Header getToken={props.getToken} name={props.userData.name} />
        <Main completed={completed} getTaskInfo={getTaskInfo} fetchCategories={fetchCategories} openTaskInfo={openTaskInfo} addTask={props.addTask} tasks = {props.tasks} openModalEditCategory={openModalEditCategory} updateCategories={props.updateCategories} openModalCategory={openModalCategory} categories={props.categories} name={props.userData.name} surname={props.userData.surname} gender={props.userData.gender} getToken={props.getToken} userData={props.userData} updateUserDataInApp={props.updateUserDataInApp}/>
        <Footer openModal={openModal} />
      </div>
    </div>
  )
}

export default Content