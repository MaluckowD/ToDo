import { NavLink } from "react-router-dom"
import s from "./Buttons.module.css"
import { fetchUserName } from "../../../../api/api"
import { useNavigate } from "react-router-dom"
import useStore from "../../../../store/useToDoStore.js";
const Buttons = (props) => {
  const navigate = useNavigate();
  const token = useStore((state) => state.token);
  const UpdateCallBack = () => {
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