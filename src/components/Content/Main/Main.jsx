import s from "./Main.module.css"
import Settings from "./Settings/Settings"
import Calendar from "./Calendar/Calendar"
import { Route, Routes } from "react-router-dom"

const Main = (props) => {
  
  return (
    <main className = {s.main}>
      <Routes>
        <Route index element={<Calendar />} />
        <Route path="Settings" element={<Settings name={props.name} surname={props.surname} gender={props.gender} getToken={props.getToken} userData = {props.userData}/>} />
      </Routes>
      
      
    </main>
  )
}

export default Main