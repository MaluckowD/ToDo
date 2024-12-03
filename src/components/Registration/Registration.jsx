import React from "react"
import { NavLink } from "react-router-dom"
import s from "./Registration.module.css"
import axios from "axios"
const Registration = (props) => {
  let newElementName = React.createRef();

  let addname = () => {
    props.addname()
  }

  let changeOnName = () => {
    let name = newElementName.current.value;
    props.changeOnName(name)

  }

  const Register = ( () => {
    let User = {
      "name": "Dim",
      "surname": "Asdgghj",
      "short_name": "fnt",
      "email": "cerbr.fishing",
      "gender": "male",
      "password": "12345"
    }
    axios.post("https://energy-cerber.ru/user/register", User)
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  })

  return (
    <div className={s.content}>
      <div className={s.content_flex}></div>
      <h2>Регистрация</h2>
      <div className={s.name}>
        <div className={s.name_item}>
          <p className={s.name_description}>Имя</p>
          <input ref={newElementName} onChange={changeOnName} value={props.postName} placeholder="Введите имя" />
        </div>
        <div className={s.name_itemsecond}>
          <p className={s.name_description}>Фамилия</p>
          <input placeholder="Введите фамилию" />
        </div>
      </div>
      <div className={s.content_wrapper}>
        <div className={s.email}>
          <p className={s.name_description}>Ваша эл. почта</p>
          <input placeholder="Введите вашу почту" />
        </div>
        <div className={s.sex}>
          <p className={s.sex_description}>Пароль</p>
          <input placeholder="Введите  пароль" />
        </div>
        <div className={s.validation}>
          <p className={s.validation_description}>Подтвердите пароль</p>
          <input placeholder="Подтвердите  пароль" />
        </div>
      </div>
      <button onClick={ Register } className={s.registration_click}>ЗАРЕГИСТРИРОВАТЬСЯ</button>
      <div className={s.questions}>
        <p>Уже есть аккаунт? <NavLink to="/">Войти</NavLink></p>
      </div>


    </div>
  )
}

export default Registration