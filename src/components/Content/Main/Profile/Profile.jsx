import s from "./Profile.module.css"
import { deleteUserApi, categorieDeleteApi } from "../../../../api/api.ts"
import React, { useEffect, useState } from 'react';
import UserInfo from "./UserInfo/UserInfo"
import CategoryList from "./CategotyList/CategoryList"
import Confirnation from "../../../Modals/Confirmation";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
const Profile = (props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDialogOpen1, setIsDialogOpen1] = useState(false)
  const [categortId, setCategortId] = useState(-1)
  const exit = () => setIsDialogOpen(false)
  const exit1 = () => setIsDialogOpen1(false)
  const navigate = useNavigate()
  const overlayRef = useRef(null)
  const token = props.getToken();

  const DeleteUser = () => {
    if (token) {
      deleteUserApi().then(response => {
        props.removeToken()
        navigate("/login");
      })
    }
  }

  const deleteCategory = (id) => {
    if (token) {
      categorieDeleteApi(id).then(response => {
        props.fetchCategories()
        props.updateCategories();
        exit1()
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
          <Confirnation exit={exit} DeleteUser={DeleteUser} />
        )}
        {isDialogOpen1 && (
          <Confirnation exit={exit1} DeleteUser={() => deleteCategory(categortId)} />
        )}
        <div className={isDialogOpen || isDialogOpen1 ? [s.content, s.block].join(" ") : [s.content]}>
          <UserInfo updateAvatarId={props.userData.id} avatarId={props.userData.id} setIsDialogOpen={setIsDialogOpen} removeToken={props.removeToken} name={props.name} surname={props.surname} gender={props.gender} getToken={props.getToken} userData={props.userData} updateUserDataInApp={props.updateUserDataInApp} />
          <CategoryList setCategortId={setCategortId} setIsDialogOpen1={setIsDialogOpen1} fetchCategories={props.fetchCategories} openModalEditCategory={props.openModalEditCategory} updateCategories={props.updateCategories} getToken={props.getToken} openModalCategory={props.openModalCategory} categories={props.categories} />
        </div>
      </div>
    </div>
  )
}

export default Profile