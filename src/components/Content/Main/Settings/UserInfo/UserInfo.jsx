import s from "./UserInfo.module.css"
import user from "../../../../../images/user.png"
import React, {useState, useEffect} from "react";
import axios from "axios";

const UserInfo = (props) => {
  const [name, setName] = useState(props.userData.name);
  const [surname, setSurname] = useState(props.userData.surname);
  const [gender, setGender] = useState(props.userData.gender);

  const UpdateUserInfo = () => {
    const token = props.getToken()
    if (token){
      axios.put("https://energy-cerber.ru/user/edit", {
        name, surname, gender
      }, {
        headers: {
        Authorization: `Bearer ${token}`
      }
      },).then(response => {
        console.log(response.data)
      })
    }
  }

  return (
    <div className={s.userinfo}>
      <div className={s.user_logo}>
        <img className={s.user_img} src={user} alt=""/>
      </div>
      <div className={s.user_data}>
        <div className={s.user_name}>
          <input 
            value={name} 
            type="text" 
            placeholder="Имя" 
            onChange={(e) => setName(e.target.value)}
          />
          <input 
            value={surname} 
            type="text" 
            placeholder = "Фамилия" 
            className = {s.user_name_item}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
        <div className={s.email}>
          <input value={props.userData.email} type="text" placeholder="Ваша эл.почта" />
        </div>
        <div className={s.user_sex}>
          <input 
            value={gender} 
            type="text" 
            placeholder="Пол"
            onChange={(e) => setGender(e.target.value)}
          />
          <input value={props.userData.short_name} type="text" placeholder="Псевдоним" className={s.user_sex_item} />
        </div>
        <div className={s.save_change}>
          <button onClick = {UpdateUserInfo}>Сохранить изменения</button>
        </div>
      </div>

    </div>
  )
}

export default UserInfo