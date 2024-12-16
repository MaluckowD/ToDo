import { NavLink } from "react-router-dom"
import s from "./Buttons.module.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const Buttons = (props) => {
  const navigate = useNavigate();
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
  const handleLogout = () => {
    props.removeToken(); // Вызываем функцию removeToken из пропсов
    navigate("/login"); // Перенаправляем на страницу логина
  };


  return (
    <div className={s.buttons_item}>
      <NavLink onClick={UpdateCallBack} to="/content" className={s.link_main}>Главная</NavLink>
      <NavLink onClick={handleLogout} to = "/login" className={s.exit}>Выйти</NavLink>
    </div>

  )
}

export default Buttons