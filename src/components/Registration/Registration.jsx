import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import s from "./Registration.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = (props) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [shortName, setShortName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate()

  const [isConfirmation, setIsConfirmation] = useState(false);

  const [error, setError] = useState(null);
  const [code, setCode] = useState("");

  const confirmation = () => {
    const userData = {
      name: name,
      surname: surname,
      short_name: shortName,
      email: email,
      gender: gender,
      password: password,
    };

    if (password !== confirmPassword) {
      setError("Пароль и подтверждение пароля не совпадают!");
      return;
    }
    
    localStorage.setItem('userData', JSON.stringify(userData));

    console.log('Data saved to localStorage:', userData);
    setIsConfirmation(true)

  }

  const closeConfirmation = () => {
    setIsConfirmation(false)
  }

  const Register = async () => {
    setError(null);
    if (password !== confirmPassword) {
      setError("Пароль и подтверждение пароля не совпадают!");
      return;
    }

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
        "https://api.energy-cerber.ru/user/register",
        userData
      );
      if (response.status === 200 || response.status === 201) {
        console.log("Регистрация успешна:", response.data);
        props.onDataUser({ email, password });
        props.saveToken(response.data.access_token);
        navigate("/Content")
        window.location.reload()
      } else {
        console.error("Ошибка регистрации:", response.status, response.data);
      }
    } catch (error) {
      console.error("Ошибка:", error);
      if (error.response) {
        setError(`Вы ввели не все данные или их длина недостаточна!
                Длина имени и фамилии от 2 символов, короткого имени от 3, адреса почты от 6 символов, пароля от 8!`);
      } else if (error.request) {
        setError(`Ошибка сети: ${error.message}`)
      }
      else {
        setError(`Ошибка при создании запроса: ${error.message}`)
      }
    }
  };

  return (
    <div className="wrapper">
      {isConfirmation && (
        <div className={s.modal}>
          <div className={s.modalcontent}>
            <label for = "code">Введите код подтверждения</label>
            <input 
              id = "code"
              value={code}
              onChange={(event) => setCode(event.target.value)}
            />
            <button>Зарегистрироваться</button>
            <button onClick = {closeConfirmation}>Закрыть окно</button>
          </div>
        </div>
      )}

      <div className={isConfirmation ? [s.content, s.opacity].join(' ') : [s.content]}>
        <h2>Регистрация</h2>
        <div className={s.name}>
          <div className={s.name_item}>
            <p className={s.name_description}>Имя</p>
            <input
              maxlength='100'
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите имя"
            />
          </div>
          <div className={s.name_itemsecond}>
            <p className={s.name_description}>Фамилия</p>
            <input
              maxlength='100'
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Введите фамилию"
            />
          </div>
        </div>

        <div className={s.content_wrapper}>
          <div className={s.box}>
            <p className={s.name_description}>Выберите пол</p>
            <select className={s.male} name="gender" id="pet-select" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="male">Мужской</option>
              <option value="female">Женский</option>
            </select>
          </div>
          <div className={s.email}>
            <p className={s.name_description}>Введите ваше короткое имя</p>
            <input
              maxlength='100'
              type="text"
              value={shortName}
              onChange={(e) => setShortName(e.target.value)}
              placeholder="Введите короткое имя"
            />
          </div>
          <div className={s.email}>
            <p className={s.name_description}>Ваша эл. почта</p>
            <input
              maxlength='100'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введите вашу почту"
            />
          </div>
          <div className={s.sex}>
            <p className={s.sex_description}>Пароль</p>
            <input
              maxlength='100'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите  пароль"
            />
          </div>
          <div className={s.validation}>
            <p className={s.validation_description}>Подтвердите пароль</p>
            <input
              maxlength='100'
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Подтвердите  пароль"
            />
          </div>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <button onClick={confirmation} className={s.registration_click}>
          ЗАРЕГИСТРИРОВАТЬСЯ
        </button>
        <div className={s.questions}>
          <p>Уже есть аккаунт? <NavLink to="/">Войти</NavLink></p>
        </div>
      </div>

    </div>

    
  )
}

export default Registration
