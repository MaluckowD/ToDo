import s from "./UserInfo.module.css"
import userAvatar from "../../../../../images/user.jpg"
import iconChoice from "../../../../../images/choiceIcon.svg"
import React, { useState, useEffect } from "react";
import { UserEditApi, addAvatarApi, getAvatarData } from "../../../../../api/api.ts"

const UserInfo = (props) => {
  const [name, setName] = useState(props.name);
  const [surname, setSurname] = useState(props.surname);
  const [gender, setGender] = useState(props.gender);
  const [error, setError] = useState(null);
  const token = props.getToken()
  const DeleteUserDialog = () => props.setIsDialogOpen(true)
  const [avatarUrl, setAvatarUrl] = useState(userAvatar); 

  const getAvatarUrl = async () => { 
    const response = await getAvatarData(props.avatarId); 
    if (response) {
      return `https://api.energy-cerber.ru/static/avatars/${props.userData.id}.webp`;
    } else {
      return userAvatar; 
    }
  };

  useEffect(() => {
    const loadAvatar = async () => {  
      const url = await getAvatarUrl();
      setAvatarUrl(url);
    };

    loadAvatar(); 

  }, [props.avatarId]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);
      try {
        const response = await addAvatarApi(formData)
        // props.updateAvatarId(response.id);
        window.location.reload();
      }
      catch (error) {
        console.log("error_avatar")
      }
    } else {
    }
  };

  const UpdateUserInfo = async () => {
    setError(null);
    if (token) {
      try {
        const response = await UserEditApi({ name, surname, gender })
        props.updateUserDataInApp(response);
      }
      catch (error) {
        if (error.response) {
          setError(`Ошибка при обновлении данных пользователя. Длина имени и фамилии от 2 символов!`);
        }
        else if (error.request) {
          setError(`Ошибка сети`)
        }
      }
    }
  };

  if (!props.userData) return <p>Загрузка данных...</p>;

  return (
    <div className={s.userinfo}>
      <div className={s.user_logo}>
        <img className={s.user_img} src={avatarUrl} alt={userAvatar} />
        <input onChange={handleFileChange} id="file-input" className={s.opacityInputFile} type="file" />
        <img className={s.choice_icon} src={iconChoice} alt="" />
      </div>
      <div className={s.user_data}>
        <div className={s.user_name}>
          <input
            maxlength='50'
            className={s.name_adaptive}
            value={name}
            type="text"
            placeholder="Имя"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            maxlength='50'
            value={surname}
            type="text"
            placeholder="Фамилия"
            className={s.user_name_item}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
        <div className={s.email}>
          <input style={{ opacity: "0.5" }} disabled value={props.userData.email} type="text" placeholder="Ваша эл.почта" />
        </div>
        <div className={s.user_sex}>
          <select className={s.user_style} value={gender}
            onChange={(e) => setGender(e.target.value)}>
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
          </select>
          <input style={{ opacity: "0.5" }} disabled value={props.userData.short_name} type="text" placeholder="Псевдоним" className={s.user_sex_item} />
        </div>
        {error && <p style={{ width: "400px", marginBottom: "10px" }} className="text-red-500 text-center">{error}</p>}
        <div className={s.save_change}>
          <button onClick={UpdateUserInfo}>Сохранить изменения</button>
        </div>
        <div className={s.save_change}>
          <button onClick={DeleteUserDialog}>Удалить пользователя</button>
        </div>
      </div>
    </div>
  )
}

export default UserInfo