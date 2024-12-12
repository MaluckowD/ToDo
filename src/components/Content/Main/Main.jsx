import s from "./Main.module.css"
import Settings from "./Settings/Settings"
import Calendar from "./Calendar/Calendar"
import { Route, Routes } from "react-router-dom"

const Main = (props) => {
  
  return (
    <main className = {s.main}>
      <Routes>
        <Route index element={<Calendar addTask={props.addTask} tasks = {props.tasks} />} />
        <Route path="Settings" element={<Settings openModalEditCategory={props.openModalEditCategory} updateCategories={props.updateCategories} openModalCategory={props.openModalCategory} categories={props.categories} name={props.userData.name} surname={props.userData.surname} gender={props.userData.gender} getToken={props.getToken} userData={props.userData} updateUserDataInApp={props.updateUserDataInApp} />} />
      </Routes>
      
      
    </main>
  )
}

export default Main