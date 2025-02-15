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
  const [errorCode, setErrorCode] = useState(null);
  const [code, setCode] = useState("");

  const confirmation = async () => {
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

    if (userData.name.length < 2 || userData.surname.length < 2 || userData.short_name.length < 3 || userData.email.length < 6 || userData.password.length < 8) {
      setError(`Вы ввели не все данные или их длина недостаточна!
                Длина имени и фамилии от 2 символов, короткого имени от 3, адреса почты от 6 символов, пароля от 8!`);
      return <></>
    }
    setError(null);

    try {
      const response = await axios.get(
        `https://api.energy-cerber.ru/user/register/verify_code?email=${userData.email}`,
      )
      console.log("Response Object", response)
      console.log("response Code", response.status)

      if (response.status === 200 || response.status === 201) {
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log('Data saved to localStorage:', userData);

        setIsConfirmation(true)
      }
      else {
        setError("Данный email или короткое имя пользователя уже существует")
      }
    }
    catch (error) {
      if (error.status === 400 || error.status === 401 || error.status === 403) {
        setError("Данный email или короткое имя пользователя уже существует")
      }
      else {
        setError("Ошибка отправки кода подтверждения! Попробуйте зарегистрироваться позже!")
      }
    }

  }

  const closeConfirmation = () => {
    setIsConfirmation(false)
    setCode("")
    setErrorCode(null)
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
      const confirmationResponse = await axios.post(
        // В продакшене заменить 77777 на code
        `https://api.energy-cerber.ru/user/register/verify_code?email=${userData.email}&code=${77777}`
      )

      if (confirmationResponse.status === 200 || confirmationResponse.status === 201) {
        console.log("Successful code confirmation!")

        try {
          const registrationResponse = await axios.post(
            "https://api.energy-cerber.ru/user/register",
            userData
          );

          if (registrationResponse.status === 200 || registrationResponse.status === 201) {
            console.log("Регистрация успешна:", registrationResponse.data);
            props.saveToken(registrationResponse.data.access_token);
            navigate("/Content")
            window.location.reload()
          }
          else {
            console.error("Ошибка регистрации:", registrationResponse.status, registrationResponse.data);
          }
        }

        catch (error) {
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
      }
    }
    catch (error) {
      setErrorCode(`Неверный код подтверждения`);
    }

  };

  return (
    <div className="wrapper">
      {isConfirmation && (
        <div className={s.modal}>
          <div className={s.modalcontent}>
            <h3>Введите код</h3>
            <div>
              <label for="code">Код подтверждения</label>
              <input
                id="code"
                value={code}
                onChange={(event) => setCode(event.target.value)}
              />
            </div>
            <div>
              <button onClick={Register} className={s.registration}>Зарегистрироваться</button>
              <button className={s.close} onClick={closeConfirmation}>Закрыть окно</button>
              {errorCode && <p className="text-red-500 text-center">{errorCode}</p>}
            </div>
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
