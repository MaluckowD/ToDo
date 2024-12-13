import { NavLink } from "react-router-dom"
import s from "./Userinfo.module.css"
import axios from "axios";
import { useEffect } from "react";

const Userinfo = (props) => {

  
  const UpdateCallBack = () => {
    const token = props.getToken();

    const fetchUserName = async () => {
      axios.get("https://api.energy-cerber.ru/user/self", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        console.log(response)
        return response.data;
      }
      )
    }
    if (token) {
      fetchUserName();
    }

  }
  return (
    <div className={s.header_infouser}>
      <NavLink to= "Settings">
        <img onClick={UpdateCallBack}  className={s.photo} src="../../../user.png" alt="" />
      </NavLink>
      <div className={s.username}> {props.name} </div>
    </div>
  )
}

export default Userinfo