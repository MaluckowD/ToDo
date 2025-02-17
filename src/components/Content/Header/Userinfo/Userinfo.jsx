import { NavLink } from "react-router-dom"
import s from "./Userinfo.module.css"
import { fetchUserName } from "../../../../api/api.ts"
import user from "../../../../images/user.jpg"

const Userinfo = (props) => {

  const UpdateCallBack = () => {
    const token = props.getToken();
    if (token) {
      fetchUserName();
    }
  }

  const getAvatarUrl = () => {
    if (props.avatarId !== '') {
      return `https://api.energy-cerber.ru/static/avatars/${props.avatarId}.webp?${Date.now()}`;
    } else {
      return user;
    }
  };

  return (
    <div className={s.header_infouser}>
      <NavLink to= "settings">
        <img onClick={UpdateCallBack} className={s.photo} src={getAvatarUrl()} alt="" />
      </NavLink>
      <div className={s.username}> {props.name} </div>
    </div>
  )
}

export default Userinfo