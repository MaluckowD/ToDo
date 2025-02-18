import { NavLink } from "react-router-dom"
import s from "./Userinfo.module.css"
import { fetchUserName, getAvatarData } from "../../../../api/api.ts"
import React, { useState, useEffect } from "react";
import userAvatar from "../../../../images/user.jpg"


const Userinfo = (props) => {

  const UpdateCallBack = () => {
    const token = props.getToken();
    if (token) {
      fetchUserName();
    }
  }
  const [avatarUrl, setAvatarUrl] = useState(userAvatar);

  const getAvatarUrl = async () => {
    const response = await getAvatarData(props.avatarId);
    if (response) {
      return `https://api.energy-cerber.ru/static/avatars/${props.avatarId}.webp`;
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
      <div className={s.username}> {props.name} </div>
    </div>
  )
}

export default Userinfo