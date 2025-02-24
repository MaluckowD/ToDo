import s from "./UserInfo.module.css"
import userAvatar from "../../../../../images/user.jpg"
import iconChoice from "../../../../../images/choiceIcon.svg"
import React, { useState, useEffect } from "react";
import useStore from "../../../../../store/useToDoStore.js";

const UserInfo: React.FC = () => {

  const UpdateUserInfo = useStore((state) => state.UpdateUserInfo);
  const userData = useStore((state) => state.userData);
  const ERROR = useStore((state) => state.ERROR);
  const avatarUrl = useStore((state) => state.avatarUrl);
  const loadAvatar = useStore((state) => state.loadAvatar);
  const handleFileChange = useStore((state) => state.handleFileChange);
  const DeleteUserDialog = useStore((state) => state.DeleteUserDialog);
  
  const [name, setName] = useState(userData.name);
  const [surname, setSurname] = useState(userData.surname);
  const [gender, setGender] = useState(userData.gender);
  
  useEffect(() => {
    loadAvatar();
  }, [userData.id]);

  if (!userData) return <p>Загрузка данных...</p>;

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
            maxLength= {50}
            className={s.name_adaptive}
            value={name}
            type="text"
            placeholder="Имя"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            maxLength={50}
            value={surname}
            type="text"
            placeholder="Фамилия"
            className={s.user_name_item}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
        <div className={s.email}>
          <input style={{ opacity: "0.5" }} disabled value={userData.email} type="text" placeholder="Ваша эл.почта" />
        </div>
        <div className={s.user_sex}>
          <select className={s.user_style} value={gender}
            onChange={(e) => setGender(e.target.value)}>
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
          </select>
          <input style={{ opacity: "0.5" }} disabled value={userData.short_name} type="text" placeholder="Псевдоним" className={s.user_sex_item} />
        </div>
        {ERROR && <p style={{ width: "400px", marginBottom: "10px" }} className="text-red-500 text-center">{ERROR}</p>}
        <div className={s.save_change}>
          <button onClick={() => UpdateUserInfo(name, surname, gender)}>Сохранить изменения</button>
        </div>
        <div className={s.save_change}>
          <button onClick={DeleteUserDialog}>Удалить пользователя</button>
        </div>
      </div>
    </div>
  )
}

export default UserInfo