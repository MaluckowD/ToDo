import { NavLink } from "react-router-dom"
import s from "./Userinfo.module.css"

const Userinfo = () => {

  return (
    <div className={s.header_infouser}>
      <NavLink to= "Settings">
        <img className={s.photo} src="../../../user.png" alt="" />
      </NavLink>
      <div className={s.username}> Igor </div>
    </div>
  )
}

export default Userinfo