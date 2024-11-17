import s from "./Settings.module.css"
import UserInfo from "./UserInfo/UserInfo"

const Settings = () => {

  return (
    <div className={s.settings_item}>
      <div className={s.container}>
        <div className={s.content}>
          <UserInfo/>
        </div>
      </div>
    </div>
  )
}

export default Settings