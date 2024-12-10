import Header from "./Header/Header"
import Main from "./Main/Main"
import Footer from "./Footer/Footer"
import s from "./Content.module.css"
import React, { useCallback, useEffect, useState } from 'react';
import axios from "axios";
import Kirillloh from "../../images/KirillLoh.jpg"
import Ville from "../../images/Vinne.jpg"
const Content = (props) => {
  const token = props.getToken()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCategoryOpen, setIsModalCategoryOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryColor, setCategoryColor] = useState("#F44336");
  const openModalCategory = () => setIsModalCategoryOpen(true);

  const closeModalCategory = () => {
    const categoryData = {
      name: categoryName,
      color: categoryColor
    }
    
    axios.post("https://energy-cerber.ru/categories/", categoryData,{
      headers: {
        Authorization: `Bearer ${token}`
      }
      }).then(response => {
        console.log(response.data)
        setIsModalCategoryOpen(false)
      })
    
  }
  
  const [name, setName] = useState('');
  const [surname, setSurname] = useState("");
  const [gender, setGender] = useState("");

  if (props.isLoading) {
    return <p>Загрузка данных...</p>;
  }

  if (props.error) {
    return <p>Ошибка: {props.error.message}</p>;
  }

  return(
    <div className = {s.root}>
      {isModalOpen && (
        <div className={s.modal}>
          <div className={s.modalcontent}>
            <img classNane={s.modalcontent_image} src={Ville}></img>
            <p>ВИНИСИУС ЛОХ</p>
            <button className={s.close} onClick={closeModal}>Выйти</button>
          </div>
        </div>
      )}


      {isModalCategoryOpen && (
        <div className={s.modal}>
          <div className={s.modalcontent}>
            <input 
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Введите название категории" 
            />

            <select name="color" value={categoryColor} onChange={(e) => setCategoryColor(e.target.value)}>
              <option value="">Укажите цвет для категории</option>
              <option value="#F44336">Красный</option>
              <option value="#4CAF50">Зеленый</option>
              <option value="#2196F3">Синий</option>
              <option value="#FFC107">Желтый</option>
              <option value="#FF9800">Оранжевый</option>
              <option value="#9C27B0">Фиолетовый</option>
              <option value="#E91E63">Красный</option>
            </select>
            <button className={s.close} onClick={closeModalCategory}>Добавить категорию</button>
          </div>
        </div>
      )}
      
      <div className={isModalOpen || isModalCategoryOpen ? [s.wrapper, s.opacity].join(' ') : s.wrapper}>
        <Header getToken={props.getToken} name={props.userData.name} />
        <Main openModalCategory={openModalCategory} categories={props.categories} name={props.userData.name} surname={props.userData.surname} gender={props.userData.gender} getToken={props.getToken} userData={props.userData} updateUserDataInApp={props.updateUserDataInApp}/>
        <Footer openModal={openModal} />
      </div>
    </div>
  )
}

export default Content