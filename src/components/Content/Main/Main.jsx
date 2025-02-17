import s from "./Main.module.css"
import Profile from "./Profile/Profile"
import Calendar from "./Calendar/Calendar"
import { Route, Routes } from "react-router-dom"

const Main = (props) => {
  return (
    <main className = {s.main}>
      <Routes>
        <Route index element={<Calendar updateTasks={props.updateTasks} getTaskStatus={props.getTaskStatus} taskStatuses={props.taskStatuses} statusId={props.statusId} completed={props.completed} getTaskInfo = {props.getTaskInfo} getToken={props.getToken} openTaskInfo={props.openTaskInfo} addTask={props.addTask} tasks = {props.tasks} />} />
        <Route path="settings" element={<Profile updateAvatarId={props.updateAvatarId} avatarId={props.avatarId} removeToken={props.removeToken} fetchCategories={props.fetchCategories} openModalEditCategory={props.openModalEditCategory} updateCategories={props.updateCategories} openModalCategory={props.openModalCategory} categories={props.categories} name={props.userData.name} surname={props.userData.surname} gender={props.userData.gender} getToken={props.getToken} userData={props.userData} updateUserDataInApp={props.updateUserDataInApp} />} />
      </Routes>
    </main>
  )
}

export default Main