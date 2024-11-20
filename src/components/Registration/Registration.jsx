
import { NavLink } from "react-router-dom"
import s from "./Registration.module.css"

const Registration = () => {

  return (
    <div className={s.content}>
      <div className = {s.content_flex}></div>
        <h2>Регистрация</h2>
        <div className={s.name}>
          <div className={s.name_item}>
            <p className = {s.name_description}>Имя</p>
            <input placeholder="Введите имя" />
          </div>
          <div className={s.name_itemsecond}>
            <p className={s.name_description}>Фамилия</p>
            <input placeholder = "Введите фамилию"/>
          </div>
      </div>
      <div className={s.content_wrapper}>
        <div className={s.email}>
          <p className={s.name_description}>Ваша эл. почта</p>
          <input placeholder="Введите  адрес электронной почты" />
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
      <button className={s.registration_click}>ЗАРЕГИСТРИРОВАТЬСЯ</button>
      <div className={s.questions}>
        <p>Уже есть аккаунт? <NavLink to="/">Войти</NavLink></p>
      </div>
      
      
    </div>
  )
}

export default Registration