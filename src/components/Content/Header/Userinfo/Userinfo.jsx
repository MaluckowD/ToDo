import { NavLink } from "react-router-dom"
import s from "./Userinfo.module.css"
import { fetchUserName } from "../../../../api/api.ts"

const Userinfo = (props) => {

  const UpdateCallBack = () => {
    const token = props.getToken();
    if (token) {
      fetchUserName();
    }

  }
  return (
    <div className={s.header_infouser}>
      <NavLink to= "settings">
        <img onClick={UpdateCallBack}  className={s.photo} src="../../../user.png" alt="" />
      </NavLink>
      <div className={s.username}> {props.name} </div>
    </div>
  )
}

export default Userinfo