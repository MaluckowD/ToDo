import Header from "./Header/Header"
import Main from "./Main/Main"
import Footer from "./Footer/Footer"
import s from "./Content.module.css"
import React, { useState } from 'react';
import axios from "axios";
import { Ping, RegistrateUser } from "../../api/api"
import Kirillloh from "../../images/KirillLoh.jpg"
const Content = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  let User = {
    "name": "Дима",
    "surname": "илоиоло",
    "short_name": "fun",
    "email": "cerber.fishi",
    "gender": "male",
    "password": "12ц345"
  }
  axios.post("http://energy-cerber.ru:8000/user/register", User)
    .then((response) => {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  
  return(
    <div className = {s.root}>
      {isModalOpen && (
        <div className={s.modal}>
          <div className={s.modalcontent}>
            <img classNane={s.modalcontent_image} src={Kirillloh}></img>
            <p>КИРИЛЛ ЛОХ</p>
            <button className={s.close} onClick={closeModal}>Выйти</button>
          </div>
        </div>
      )}
      <div className={isModalOpen ? [s.wrapper, s.opacity].join(' ') : s.wrapper}>
        <Header />
        <Main />
        <Footer openModal={openModal} />
      </div>
    </div>
  )
}

export default Content