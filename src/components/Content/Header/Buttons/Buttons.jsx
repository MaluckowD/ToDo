import { NavLink } from "react-router-dom"
import s from "./Buttons.module.css"
import axios from "axios"
const Buttons = (props) => {

  const UpdateCallBack = () => {
    const token = props.getToken();


    const fetchUserName = async () => {
      axios.get("https://energy-cerber.ru/user/self", {
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
    <div className={s.buttons_item}>
      <NavLink onClick={UpdateCallBack} to="/Content" className={s.link_main}>Главная</NavLink>
      <NavLink to = "/" className={s.exit}>Выйти</NavLink>
    </div>

  )
}

export default Buttons