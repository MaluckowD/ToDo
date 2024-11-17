import s from "./UserInfo.module.css"

const UserInfo = () => {

  return (
    <div className={s.userinfo}>
      <div className={s.user_logo}>
        <img className={s.user_img} src="user.png" alt=""/>
      </div>

      <div className={s.user_data}>
        <div className={s.user_name}>
          <input type="text" placeholder = "Имя"/>
          <input type="text" placeholder = "Фамилия" className = {s.user_name_item}/>
        </div>
        <div className={s.email}>
          <input type="text" placeholder="Ваша эл.почта" />
        </div>
        <div className={s.user_sex}>
          <input type="text" placeholder="Пол" />
          <input type="text" placeholder="Shortname" className={s.user_sex_item} />
        </div>

      </div>

    </div>
  )
}

export default UserInfo