import s from "./Header.module.css"
import Userinfo from "./Userinfo/Userinfo"
import Buttons from "./Buttons/Buttons"
import useStore from "../../../store/useToDoStore.js"

const Header = (props) => {
  const userData = useStore((state) => state.userData);
  if (!userData.name) { 
    return <div>Загрузка данных пользователя...</div>;
  }
  return (
    <header className={s.header}>
      <div className={s.container}>
        <div className={s.header_inner}>
          <Userinfo/>
          <Buttons/>
        </div>
      </div>
    </header>
  )
}

export default Header 