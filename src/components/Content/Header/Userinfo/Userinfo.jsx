import { NavLink } from "react-router-dom"
import s from "./Userinfo.module.css"
import { fetchUserName, getAvatarData } from "../../../../api/api.ts"
import React, { useState, useEffect } from "react";
import userAvatar from "../../../../images/user.jpg"
import useStore from "../../../../store/useToDoStore.js";

const Userinfo = (props) => {
  const token = useStore((state) => state.token);
  const userData = useStore((state) => state.userData);
  const UpdateCallBack = () => {

    if (token) {
      fetchUserName();
    }
  }
  const [avatarUrl, setAvatarUrl] = useState(userAvatar);

  const getAvatarUrl = async () => {
    const response = await getAvatarData(props.avatarId);
    if (response) {
      return `https://api.energy-cerber.ru/static/avatars/${userData.id}.webp`;
    } else {
      return userAvatar;
    }
  };

  useEffect(() => {
    const loadAvatar = async () => {
      const url = await getAvatarUrl();
      setAvatarUrl(url);
    };

    loadAvatar();

  }, [props.avatarId]);

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