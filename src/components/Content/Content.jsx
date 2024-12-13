import Header from "./Header/Header"
import Main from "./Main/Main"
import Footer from "./Footer/Footer"
import s from "./Content.module.css"
import React, { useState } from 'react';
import axios from "axios";
import Kirillloh from "../../images/KirillLoh.jpg"
import Ville from "../../images/Vinne.jpg"
const Content = (props) => {
  const token = props.getToken()
  const [isOpenTaskInfo, setOpenTaskInfo] = useState(false);
  const [isModalCategoryOpen, setIsModalCategoryOpen] = useState(false);
  const [isEditCategoryOpen, setIsEditModalCategoryOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const closeModalCat = () => setIsModalCategoryOpen(false);
  const closeModalEditCat = () => setIsEditModalCategoryOpen(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryColor, setCategoryColor] = useState("#F44336");
  const [categoryId, setcategoryId] = useState(0);
  const openModalCategory = () => setIsModalCategoryOpen(true);
  const closeIsOpenTaskInfo = () => setOpenTaskInfo(false);
  const [date, setDate] = useState("")
  const openModalEditCategory = (id) => {
    setcategoryId(id)
    setIsEditModalCategoryOpen(true)

  };

  const openTaskInfo = (e) => {
    const dateString = e.currentTarget.getAttribute('data-date');
    setDate(dateString)
    setOpenTaskInfo(true)
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
      setIsEditModalCategoryOpen(false)
    })
  }
  
  
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
            <input className={s.categoryName}
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Введите название для задачи"
            />
            <input className={s.categoryName}
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Описание"
            />
            <input className={s.categoryName}
              type="text"
              value={date}
              disabled
              placeholder="Дата задачи"
            />
            <input className={s.categoryName}
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Приоритет"
            />

            <button className={s.closeModalCategory} onClick={closeModalCategory}>
              Добавить задачу
            </button>
            <button className={s.closeModalCategory} onClick={closeIsOpenTaskInfo}>Выйти</button>
          </div>
        </div>
      )}


      {isModalCategoryOpen&& (
        <div className={s.modal}>
          <div className={s.modalcontent}>
            <input className= {s.categoryName}
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Введите название категории" 
            />

            <select style={{ backgroundColor: categoryColor }} className={s.categoryColor} name="color" value="Укажите цвет для категории" onChange={(e) => setCategoryColor(e.target.value)}>
              <option value="">Укажите цвет для категории</option>
              {colors.map((item) => (
                <option style={{ backgroundColor: item }} value= {item}></option>
              ))}
            </select>
            <button className={s.closeModalCategory} onClick={closeModalCategory}>Добавить категорию</button>
            <button className={s.closeModalCategory} onClick={closeModalCat}>Выйти</button>
          </div>
        </div>
      )}

      {isEditCategoryOpen && (
        <div className={s.modal}>
          <div className={s.modalcontent}>
            <input className={s.categoryName}
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Введите название категории"
            />

            <select style={{ backgroundColor: categoryColor }} className={s.categoryColor} name="color" value="Укажите цвет для категории" onChange={(e) => setCategoryColor(e.target.value)}>
              <option value="">Укажите цвет для категории</option>
              {colors.map((item) => (
                <option style={{ backgroundColor: item }} value={item}></option>
              ))}
            </select>
            <button className={s.closeModalCategory} onClick={() => EditCategory(categoryId)}>Редактировать</button>
            <button className={s.closeModalCategory} onClick={closeModalEditCat}>Выйти</button>
          </div>
        </div>
      )}
      
      <div className={isModalOpen || isModalCategoryOpen || isEditCategoryOpen ? [s.wrapper, s.opacity].join(' ') : s.wrapper}>
        <Header getToken={props.getToken} name={props.userData.name} />
        <Main openTaskInfo={openTaskInfo} addTask={props.addTask} tasks = {props.tasks} openModalEditCategory={openModalEditCategory} updateCategories={props.updateCategories} openModalCategory={openModalCategory} categories={props.categories} name={props.userData.name} surname={props.userData.surname} gender={props.userData.gender} getToken={props.getToken} userData={props.userData} updateUserDataInApp={props.updateUserDataInApp}/>
        <Footer openModal={openModal} />
      </div>
    </div>
  )
}

export default Content