import s from "./Settings.module.css"
import UserInfo from "./UserInfo/UserInfo"
import CategoryList from "./CategotyList/CategoryList"
const Settings = () => {

  return (
    <div className={s.settings_item}>
      <div className={s.container}>
        <div className={s.content}>
          <UserInfo/>
          <CategoryList/>
        </div>
      </div>
    </div>
  )
}

export default Settings