import { NavLink } from "react-router-dom"
import s from "./Buttons.module.css"

const Buttons = () => {

  return (
    <div className={s.buttons_item}>
      <NavLink to="/Content" className={s.link_main}>Главная</NavLink>
      <NavLink to = "/" className={s.exit}>Выйти</NavLink>
    </div>

  )
}

export default Buttons