import { NavLink } from "react-router-dom"
import s from "./Userinfo.module.css"
import { useEffect } from "react";
import userAvatar from "../../../../images/user.jpg"
import useStore from "../../../../store/useToDoStore";

const Userinfo: React.FC = () => {

  const userData = useStore((state) => state.userData);
  const loadAvatar = useStore((state) => state.loadAvatar);
  const avatarUrl = useStore((state) => state.avatarUrl);

  useEffect(() => {
    loadAvatar();
  }, [userData.id]);

  if (!userData) {
    return <div>Загрузка</div>
  }

  return (
    <div className={s.header_infouser}>
      <NavLink to="settings">
        <img className={s.photo} src={avatarUrl} alt={userAvatar} />
      </NavLink>
      <div className={s.username}> {userData.name} </div>
    </div>
  )
}

export default Userinfo