import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import Header from "./Header/Header"
import Main from "./Main/Main"
import Footer from "./Footer/Footer"
import KirillLoh from '../Modals/KirillLoh/KirillLoh';
import AddTask from '../Modals/AddTask/AddTask';
import TaskVariants from '../Modals/TaskVariants/TaskVariants';
import s from "./Content.module.css"
import Confirnation from "../Modals/Confirmation";
import AboutTask from '../Modals/AboutTask/AboutTask';
import EditTask from '../Modals/EditTask/EditTask';
import AddCategory from '../Modals/AddCategory/AddCategory';
import EditCategory from '../Modals/EditCategory/EditCategory';
import useStore from "../../store/useToDoStore.js";

const Content = () => {
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const isLoading = useStore((state) => state.isLoading)
  const isTaskUpdateOpen = useStore((state) => state.isTaskUpdateOpen);
  const isTaskInfoOpen = useStore((state) => state.isTaskInfoOpen);
  const fetchCategories = useStore((state) => state.fetchCategories);
  const isModalOpen = useStore((state) => state.isModalOpen);
  const isOpenTaskInfo = useStore((state) => state.isOpenTaskInfo);
  const isWarningOpen = useStore((state) => state.isWarningOpen);
  const isTaskOpen = useStore((state) => state.isTaskOpen);
  const isModalCategoryOpen = useStore((state) => state.isModalCategoryOpen)
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const token = useStore((state) => state.token);
  const isEditCategoryOpen = useStore((state) => state.isEditCategoryOpen);
  const userData = useStore((state) => state.userData);
  const error = useStore((state) => state.error);
  const handleKeyDown = useStore((state) => state.handleKeyDown);
  const handleClickOutside = useStore((state) => state.handleClickOutside);
  const isDialogOpenForDeleteTask = useStore((state) => state.isDialogOpenForDeleteTask);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', (e) => handleClickOutside(e,modalRef));
    return () => {
      document.removeEventListener('mousedown', (e) => handleClickOutside(e, modalRef));
    };
  }, [modalRef]);

  useEffect(() => {
    if (token) {
      fetchCategories()
    }
  }, [token])

  useEffect(() => {
    if (!token && !redirectToLogin) {
      setRedirectToLogin(true);
    }
  }, [token, redirectToLogin]);

  useEffect(() => {
    if (redirectToLogin) {
      navigate('/login');
    }
  }, [redirectToLogin, navigate])

  
  if (isLoading) {
    return <p>Загрузка данных...</p>;
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  if (!userData) {
    return <div>Загрузка данных пользователя...</div>;
  }

  const quary = isWarningOpen || isModalOpen || isModalCategoryOpen ||isEditCategoryOpen || isTaskOpen || isOpenTaskInfo
  
  return (
    <div className={s.root}>
      {isModalOpen && (<KirillLoh modalRef={modalRef} />)}
      {isOpenTaskInfo && ( <AddTask modalRef={modalRef} />)}
      {isTaskOpen && ( <TaskVariants modalRef={modalRef} />)}
      {isTaskInfoOpen && ( <AboutTask modalRef={modalRef} />)}
      {isTaskUpdateOpen && (<EditTask modalRef={modalRef} />)}
      {isModalCategoryOpen && ( <AddCategory modalRef={modalRef}/> )}
      {isEditCategoryOpen && ( <EditCategory modalRef={modalRef}/>)}
      {isDialogOpenForDeleteTask && ( <Confirnation /> )}
      <div className={quary ? [s.wrapper, s.opacity].join(' ') : [s.wrapper]}>
        <Header/>
        <Main/>
        <Footer/>
      </div>
    </div>
  )
}

export default Content