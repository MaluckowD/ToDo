import { NavLink } from "react-router-dom"
import s from "./Buttons.module.css"
import { fetchUserName } from "../../../../api/api"
import { useNavigate } from "react-router-dom"

const Buttons = (props) => {
  const navigate = useNavigate();
  
  const UpdateCallBack = () => {
    const token:string = props.getToken();
    if (token) {
      fetchUserName();
    }
  }

  const handleLogout = () => {
    props.removeToken(); 
    navigate("/login");
  };

  return (
    <div className={s.buttons_item}>
      <NavLink onClick={UpdateCallBack} to="/content" className={s.link_main}>Главная</NavLink>
      <NavLink onClick={handleLogout} to = "/login" className={s.exit}>Выйти</NavLink>
    </div>
  )
}

export default Buttons