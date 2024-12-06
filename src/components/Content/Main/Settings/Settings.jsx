import s from "./Settings.module.css"
import axios from "axios";
import React, { useEffect, useState } from 'react';
import UserInfo from "./UserInfo/UserInfo"
import CategoryList from "./CategotyList/CategoryList"
const Settings = (props) => {
  const [userData, setUserData] = useState(props.userData);
  const token = props.getToken();
  useEffect(() => {
    const fetchUserData = async () => {
      axios.get("https://energy-cerber.ru/user/self", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        console.log(response)
        setUserData(response.data)
        return response.data;
      }
      )
    }
    if (token) {
      fetchUserData();
    }
  }, [token])
  
  return (
    <div className={s.settings_item}>
      <div className={s.container}>
        <div className={s.content}>
          <UserInfo getToken={props.getToken} userData={props.userData}/>
          <CategoryList/>
        </div>
      </div>
    </div>
  )
}

export default Settings