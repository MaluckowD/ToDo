import Header from "./Header/Header"
import Main from "./Main/Main"
import Footer from "./Footer/Footer"
import s from "./Content.module.css"
import React, { useCallback, useEffect, useState } from 'react';
import axios from "axios";
import Kirillloh from "../../images/KirillLoh.jpg"
import Ville from "../../images/Vinne.jpg"
const Content = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const [name, setName] = useState('');
  const [surname, setSurname] = useState("");
  const [gender, setGender] = useState("");
  const token = props.getToken()

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
      <div className={isModalOpen ? [s.wrapper, s.opacity].join(' ') : s.wrapper}>
        <Header getToken={props.getToken} name={props.userData.name} />
        <Main categories={props.categories} name={props.userData.name} surname={props.userData.surname} gender={props.userData.gender} getToken={props.getToken} userData={props.userData} updateUserDataInApp={props.updateUserDataInApp}/>
        <Footer openModal={openModal} />
      </div>
    </div>
  )
}

export default Content