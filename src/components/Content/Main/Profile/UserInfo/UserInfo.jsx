import s from "./UserInfo.module.css"
import user from "../../../../../images/user.png"
import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Confirnation from "../../../../Modals/Confirmation";
const UserInfo = (props) => {

  const [userData, setUserData] = useState(props.userData);
  const [name, setName] = useState(props.name);
  const [surname, setSurname] = useState(props.surname);
  const [gender, setGender] = useState(props.gender);
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const token = props.getToken()
  const navigate = useNavigate()

  const DeleteUserDialog = () => props.setIsDialogOpen(true)
  


  const UpdateUserInfo = () => {
    if (token){
      axios.put("https://api.energy-cerber.ru/user/edit", {
        name, surname, gender
      }, {
        headers: {
        Authorization: `Bearer ${token}`
      }
      },).then(response => {
        console.log(response.data)
        props.updateUserDataInApp(response.data)
      })
    }
  }

  const DeleteUser = () => {
    if (token){
      axios.delete("https://api.energy-cerber.ru/user/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        console.log(response.data)
        props.removeToken()
        navigate("/login");
      })
    }
  }
  if (!props.userData) return <p>Загрузка данных...</p>;

  return (
    <div className={s.userinfo}>
      <div className={s.user_logo}>
        <img className={s.user_img} src={user} alt=""/>
      </div>
      <div className={s.user_data}>
        <div className={s.user_name}>
          <input
            maxlength='50'
            className = {s.name_adaptive} 
            value={name} 
            type="text" 
            placeholder="Имя" 
            onChange={(e) => setName(e.target.value)}
          />
          <input
            maxlength='50'
            value={surname} 
            type="text" 
            placeholder = "Фамилия" 
            className = {s.user_name_item}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
        <div className={s.email}>
          <input style = {{opacity: "0.5"}} disabled value={props.userData.email} type="text" placeholder="Ваша эл.почта" />
        </div>
        <div className={s.user_sex}>
          <select className = {s.user_style} value={gender}
            onChange={(e) => setGender(e.target.value)}>
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
          </select>
          <input style={{ opacity: "0.5" }} disabled value={props.userData.short_name} type="text" placeholder="Псевдоним" className={s.user_sex_item} />
        </div>
        <div className={s.save_change}>
          <button onClick = {UpdateUserInfo}>Сохранить изменения</button>
        </div>
        <div className={s.save_change}>
          <button onClick={DeleteUserDialog}>Удалить пользователя</button>
        </div>
      </div>

    </div>
  )
}

export default UserInfo