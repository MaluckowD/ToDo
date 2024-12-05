import Header from "./Header/Header"
import Main from "./Main/Main"
import Footer from "./Footer/Footer"
import s from "./Content.module.css"
import React, { useCallback, useEffect, useState } from 'react';
import axios from "axios";
import Kirillloh from "../../images/KirillLoh.jpg"
const Content = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const token = props.getToken();

  useEffect( () => {
    const fetchUserName = async () => {
      axios.get("https://energy-cerber.ru/user/self", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        console.log(response)
        setUserName(response.data.name);
        setUserData(response.data)
        return response.data;
      }
      )
    }
    if (token) {
      fetchUserName();
    }
  }, [token])
  
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
        <Header getToken={props.getToken} name={userName}/>
        <Main getToken={props.getToken} userData={userData} />
        <Footer openModal={openModal} />
      </div>
    </div>
  )
}

export default Content