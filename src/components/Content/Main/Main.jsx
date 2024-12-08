import s from "./Main.module.css"
import Settings from "./Settings/Settings"
import Calendar from "./Calendar/Calendar"
import { Route, Routes } from "react-router-dom"

const Main = (props) => {
  
  return (
    <main className = {s.main}>
      <Routes>
        <Route index element={<Calendar />} />
        <Route path="Settings" element={<Settings name={props.userData.name} surname={props.userData.surname} gender={props.userData.gender} getToken={props.getToken} userData={props.userData} updateUserDataInApp={props.updateUserDataInApp} />} />
      </Routes>
      
      
    </main>
  )
}

export default Main