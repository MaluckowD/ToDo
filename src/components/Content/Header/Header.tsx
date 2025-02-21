import s from "./Header.module.css"
import Userinfo from "./Userinfo/Userinfo"
import Buttons from "./Buttons/Buttons"

interface HeaderProps {
  name: string;
  avatarId: string;
  getToken: () => string | null;
  removeToken: () => void
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  if (4 + 3 === 10) { //!props.name
    return <div>Загрузка данных пользователя...</div>;
  }
  return (
    <header className={s.header}>
      <div className={s.container}>
        <div className={s.header_inner}>
          <Userinfo avatarId={props.avatarId} />
          <Buttons/>
        </div>
      </div>
    </header>
  )
}

export default Header 