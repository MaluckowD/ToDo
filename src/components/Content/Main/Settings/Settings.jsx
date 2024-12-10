import s from "./Settings.module.css"
import axios from "axios";
import React, { useEffect, useState } from 'react';
import UserInfo from "./UserInfo/UserInfo"
import CategoryList from "./CategotyList/CategoryList"
const Settings = (props) => {
  const [userData, setUserData] = useState(props.userData);
  const token = props.getToken();

  return (
    <div className={s.settings_item}>
      <div className={s.container}>
        <div className={s.content}>
          <UserInfo name={props.name} surname={props.surname} gender={props.gender} getToken={props.getToken} userData={props.userData} updateUserDataInApp={props.updateUserDataInApp} />
          <CategoryList openModalCategory={props.openModalCategory} categories={props.categories}/>
        </div>
      </div>
    </div>
  )
}

export default Settings