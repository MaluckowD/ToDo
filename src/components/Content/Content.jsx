import Header from "./Header/Header"
import Main from "./Main/Main"
import Footer from "./Footer/Footer"
import s from "./Content.module.css"
import React, { useCallback, useEffect, useState } from 'react';
import axios from "axios";
import { Ping, RegistrateUser } from "../../api/api"
import Kirillloh from "../../images/KirillLoh.jpg"
const Content = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  
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