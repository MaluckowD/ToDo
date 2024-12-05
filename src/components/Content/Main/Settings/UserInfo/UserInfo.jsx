import s from "./UserInfo.module.css"
import user from "../../../../../images/user.png"
const UserInfo = (props) => {

  return (
    <div className={s.userinfo}>
      <div className={s.user_logo}>
        <img className={s.user_img} src={user} alt=""/>
      </div>
      <div className={s.user_data}>
        <div className={s.user_name}>
          <input value={props.userData.name} type="text" placeholder = "Имя"/>
          <input value={props.userData.surname} type="text" placeholder = "Фамилия" className = {s.user_name_item}/>
        </div>
        <div className={s.email}>
          <input value={props.userData.email} type="text" placeholder="Ваша эл.почта" />
        </div>
        <div className={s.user_sex}>
          <input value={props.userData.gender} type="text" placeholder="Пол" />
          <input value={props.userData.short_name} type="text" placeholder="Псевдоним" className={s.user_sex_item} />
        </div>
        <div className={s.save_change}>
          <button>Сохранить изменения</button>
        </div>
      </div>

    </div>
  )
}

export default UserInfo