import { NavLink } from "react-router-dom"
import s from "./Userinfo.module.css"
import React, { useEffect } from "react";
import userAvatar from "../../../../images/user.jpg"
import useStore from "../../../../store/useToDoStore.js";

const Userinfo = (props) => {
  const userData = useStore((state) => state.userData);
  const UpdateCallBack = useStore((state) => state.UpdateCallBack);
  const loadAvatar = useStore((state) => state.loadAvatar);
  const avatarUrl = useStore((state) => state.avatarUrl);

  useEffect(() => {
    loadAvatar();
  }, [userData.id]);

  return (
    <div className={s.header_infouser}>
      <NavLink to="settings">
        <img onClick={UpdateCallBack} className={s.photo} src={avatarUrl} alt={userAvatar} />
      </NavLink>
      <div className={s.username}> {userData.name} </div>
    </div>
  )
}

export default Userinfo