import s from "./Profile.module.css"
import { deleteUserApi, categorieDeleteApi } from "../../../../api/api.ts"
import React, { useEffect, useState } from 'react';
import UserInfo from "./UserInfo/UserInfo"
import CategoryList from "./CategotyList/CategoryList"
import Confirnation from "../../../Modals/Confirmation";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import useStore from "../../../../store//useToDoStore.js";
const Profile = (props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDialogOpen1, setIsDialogOpen1] = useState(false)
  const [categortId, setCategortId] = useState(-1)
  const exit = () => setIsDialogOpen(false)
  const exit1 = () => setIsDialogOpen1(false)
  const navigate = useNavigate()
  const overlayRef = useRef(null)
  const token = useStore((state) => state.token);
  const removeToken = useStore((state) => state.removeToken);
  const updateCategories = useStore((state) => state.updateCategories);
  const fetchCategories = useStore((state) => state.fetchCategories);
  const DeleteUser = () => {
    if (token) {
      deleteUserApi().then(response => {
        removeToken()
        navigate("/login");
      })
    }
  }

  const deleteCategory = (id) => {
    if (token) {
      categorieDeleteApi(id).then(response => {
        fetchCategories()
        updateCategories();
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
          <UserInfo setIsDialogOpen={setIsDialogOpen}/>
          <CategoryList setIsDialogOpen1={setIsDialogOpen1}/>
        </div>
      </div>
    </div>
  )
}

export default Profile