import { NavLink } from "react-router-dom"
import s from "./Buttons.module.css"
import { useNavigate } from "react-router-dom"
import useStore from "../../../../store/useToDoStore";

const Buttons: React.FC = () => {
  const navigate = useNavigate();
  const removeToken = useStore((state) => state.removeToken);
  
  const handleLogout = () => {
    removeToken(); 
    navigate("/login");
  };

  return (
    <div className={s.buttons_item}>
      <NavLink to="/content" className={s.link_main}>Главная</NavLink>
      <NavLink onClick={handleLogout} to = "/login" className={s.exit}>Выйти</NavLink>
    </div>
  )
}

export default Buttons