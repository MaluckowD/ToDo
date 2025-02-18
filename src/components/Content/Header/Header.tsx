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
  if (!props.name) {
    return <div>Загрузка данных пользователя...</div>;
  }
  return (
    <header className={s.header}>
      <div className={s.container}>
        <div className={s.header_inner}>
          <Userinfo avatarId={props.avatarId} getToken={props.getToken} name={props.name} />
          <Buttons removeToken={props.removeToken} getToken={props.getToken} />
        </div>
      </div>
    </header>
  )
}

export default Header 