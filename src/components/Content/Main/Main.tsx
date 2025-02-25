import s from "./Main.module.css"
import Profile from "./Profile/Profile"
import Calendar from "./Calendar/Calendar"
import { Route, Routes } from "react-router-dom"

const Main: React.FC = () => {
  return (
    <main className={s.main}>
      <Routes>
        <Route index element={<Calendar/>}/>
        <Route path="settings" element={<Profile/>} />
      </Routes>
    </main>
  )
}

export default Main