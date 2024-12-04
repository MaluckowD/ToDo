import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import s from "./Registration.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Registration = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [shortName, setShortName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const Register = async () => {
    const userData = {
      name: name,
      surname: surname,
      short_name: shortName,
      email: email,
      gender: gender,
      password: password,
    };

    try {
      const response = await axios.post(
        "https://energy-cerber.ru/user/register",
        userData
      );
      if (response.status === 200 || response.status === 201) {
        console.log("Регистрация успешна:", response.data);
        navigate("/Content")

      } else {
        console.error("Ошибка регистрации:", response.status, response.data);

      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  return (
    <div className={s.content}>
      <h2>Регистрация</h2>
      <div className={s.name}>
        <div className={s.name_item}>
          <p className={s.name_description}>Имя</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите имя"
          />
        </div>
        <div className={s.name_itemsecond}>
          <p className={s.name_description}>Фамилия</p>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Введите фамилию"
          />
        </div>
      </div>
      <p className={s.name_description1}>Выберите пол</p>
      <select className = {s.male} name="gender" id="pet-select" value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">Укажите пол</option>
        <option value="male">Мужской</option>
        <option value="female">Женский</option>
      </select>
      

      <div className={s.content_wrapper}>
        <div className={s.email}>
          <p className={s.name_description}>Введите ваше короткое имя</p>
          <input
            type="text"
            value={shortName}
            onChange={(e) => setShortName(e.target.value)}
            placeholder="Введите короткое имя"
          />
        </div>
        <div className={s.email}>
          <p className={s.name_description}>Ваша эл. почта</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите вашу почту"
          />
        </div>
        <div className={s.sex}>
          <p className={s.sex_description}>Пароль</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите  пароль"
          />
        </div>
        <div className={s.validation}>
          <p className={s.validation_description}>Подтвердите пароль</p>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Подтвердите  пароль"
          />
        </div>
      </div>
      <button onClick={Register} className={s.registration_click}>
        ЗАРЕГИСТРИРОВАТЬСЯ
      </button>
      <div className={s.questions}>
        <p>Уже есть аккаунт? <NavLink to="/">Войти</NavLink></p>
      </div>
    </div>
  )
}

export default Registration