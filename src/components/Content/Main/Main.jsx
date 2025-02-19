import s from "./Main.module.css"
import Profile from "./Profile/Profile"
import Calendar from "./Calendar/Calendar"
import { Route, Routes } from "react-router-dom"

const Main = (props) => {
  return (
    <main className={s.main}>
      <Routes>
        <Route index element={<Calendar getTaskStatus={props.getTaskStatus} statusId={props.statusId} completed={props.completed} getTaskInfo={props.getTaskInfo} openTaskInfo={props.openTaskInfo} addTask={props.addTask} />} />
        <Route path="settings" element={<Profile updateAvatarId={props.userData.id} avatarId={props.userData.id} fetchCategories={props.fetchCategories} openModalEditCategory={props.openModalEditCategory} updateCategories={props.updateCategories} categories={props.categories} name={props.userData.name} surname={props.userData.surname} gender={props.userData.gender} userData={props.userData} updateUserDataInApp={props.updateUserDataInApp} />} />
      </Routes>
    </main>
  )
}

export default Main