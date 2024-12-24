import s from "./Profile.module.css"
import axios from "axios";
import React, { useEffect, useState } from 'react';
import UserInfo from "./UserInfo/UserInfo"
import CategoryList from "./CategotyList/CategoryList"
import Confirnation from "../../../Modals/Confirmation";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
const Profile = (props) => {
  const [userData, setUserData] = useState(props.userData);
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const token = props.getToken();
  const exit = () => setIsDialogOpen(false)
  const navigate = useNavigate()
  const overlayRef = useRef(null)
  const DeleteUser = () => {
      if (token){
        axios.delete("https://api.energy-cerber.ru/user/", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(response => {
          console.log(response.data)
          props.removeToken()
          navigate("/login");
        })
      }
    }
  
  useEffect(() => {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollBarWidth}px`);
    if (isDialogOpen) {
      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open')
      if (overlayRef.current) {
        overlayRef.current.classList.remove('hidden');
      }
    } else {
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open')
      if (overlayRef.current) {
        overlayRef.current.classList.add('hidden');
      }
    }
    return () => {
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open')
      if (overlayRef.current) {
        overlayRef.current.classList.add('hidden');
      }
    }
  }, [isDialogOpen]);
  
  return (

    <div className={s.settings_item}>
      <div className={s.container}>
        {isDialogOpen && (
          <Confirnation exit={exit} DeleteUser={DeleteUser}/>
        )}
        <div className={isDialogOpen ? [s.content, s.block].join(" ") : [s.content]}>
          <UserInfo setIsDialogOpen={setIsDialogOpen} removeToken={props.removeToken} name={props.name} surname={props.surname} gender={props.gender} getToken={props.getToken} userData={props.userData} updateUserDataInApp={props.updateUserDataInApp} />
          <CategoryList fetchCategories={props.fetchCategories} openModalEditCategory={props.openModalEditCategory} updateCategories={props.updateCategories} getToken={props.getToken} openModalCategory={props.openModalCategory} categories={props.categories}/>
        </div>
      </div>
    </div>
  )
}

export default Profile