import s from "./Header.module.css"
import Userinfo from "./Userinfo/Userinfo"
import Buttons from "./Buttons/Buttons"
const Header = (props) => {
  if (!props.name) {
    return <div>Загрузка данных пользователя...</div>; 
  }
  return (
    <header className = {s.header}>
      <div className={s.container}>
        <div className={s.header_inner}>
          <Userinfo avatarId={props.avatarId} getToken={props.getToken} name = {props.name}/>
          <Buttons removeToken={props.removeToken} getToken={props.getToken} />
        </div>
      </div>
    </header>
    
    
  )
}

export default Header 