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

const Content = (props) => {
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const changeError = useStore((state) => state.changeError);

  const isTaskUpdateOpen = useStore((state) => state.isTaskUpdateOpen);
  const isTaskInfoOpen = useStore((state) => state.isTaskInfoOpen);
  
  const TaskInfoOpen = useStore((state) => state.TaskInfoOpen);
  const closeTaskInfoOpen = useStore((state) => state.closeTaskInfoOpen);
  const closeTaskUpdateOpen = useStore((state) => state.closeTaskUpdateOpen);
  
  const fetchCategories = useStore((state) => state.fetchCategories);
  const isModalOpen = useStore((state) => state.isModalOpen);
  const closeModal = useStore((state) => state.closeModal);
  const isOpenTaskInfo = useStore((state) => state.isOpenTaskInfo);
  const isWarningOpen = useStore((state) => state.isWarningOpen);

  const closeIsOpenTask = useStore((state) => state.closeIsOpenTask);
  const isTaskOpen = useStore((state) => state.isTaskOpen);

  const isModalCategoryOpen = useStore((state) => state.isModalCategoryOpen)
  const closeIsOpenTaskInfo = useStore((state) => state.closeIsOpenTaskInfo)
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const token = useStore((state) => state.token);
  const closeModalCat = useStore((state) => state.closeModalCat);
  const isEditCategoryOpen = useStore((state) => state.isEditCategoryOpen);
  const userData = useStore((state) => state.userData);
  const error = useStore((state) => state.error);

  const closeModalEditCat = useStore((state) => state.closeModalEditCat);

  const CloseTaskUpdateOpen = () => {
    closeTaskUpdateOpen()
    TaskInfoOpen()
    changeError(null)
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModalCat();
        closeModal();
        closeModalEditCat();
        closeIsOpenTaskInfo();
        closeIsOpenTask();
        closeTaskInfoOpen()
        closeTaskUpdateOpen()
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };

  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModalCat();
        closeModal();
        closeModalEditCat();
        closeIsOpenTaskInfo();
        closeIsOpenTask();
        closeTaskInfoOpen()
        closeTaskUpdateOpen()
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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

  
  if (props.isLoading) {
    return <p>Загрузка данных...</p>;
  }

  if (error) {
    return <p>Ошибка: {error.message}</p>;
  }

  if (!userData.name) {
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
      {isWarningOpen && ( <Confirnation/> )}
      <div className={quary ? [s.wrapper, s.opacity].join(' ') : [s.wrapper]}>
        <Header/>
        <Main/>
        <Footer/>
      </div>
    </div>
  )
}

export default Content