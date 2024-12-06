import s from "./UserInfo.module.css"
import user from "../../../../../images/user.png"
import React, {useState, useEffect} from "react";
import axios from "axios";

const UserInfo = (props) => {

  const [userData, setUserData] = useState(props.userData);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState("");
  const [gender, setGender] = useState("");
  const token = props.getToken()

  useEffect(() => {
    const fetchUserName = async () => {
      axios.get("https://energy-cerber.ru/user/self", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        console.log(response)
        setName(response.data.name);
        setSurname(response.data.surname)
        setUserData(response.data)
        setGender(response.data.gender)
        return response.data;
      }
      )
    }
    if (token) {
      fetchUserName();
    }
  }, [token])

  
  const UpdateUserInfo = () => {
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
  if (!props.userData) return <p>Загрузка данных...</p>;

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
          <input disabled value={props.userData.email} type="text" placeholder="Ваша эл.почта" />
        </div>
        <div className={s.user_sex}>
          <input 
            value={gender} 
            type="text" 
            placeholder="Пол"
            onChange={(e) => setGender(e.target.value)}
          />
          <input disabled value={props.userData.short_name} type="text" placeholder="Псевдоним" className={s.user_sex_item} />
        </div>
        <div className={s.save_change}>
          <button onClick = {UpdateUserInfo}>Сохранить изменения</button>
        </div>
      </div>

    </div>
  )
}

export default UserInfo