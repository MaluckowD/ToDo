import s from "./Profile.module.css"
import React from 'react';
import UserInfo from "./UserInfo/UserInfo"
import CategoryList from "./CategotyList/CategoryList"
import Confirnation from "../../../Modals/Confirmation";
import useStore from "../../../../store/useToDoStore.js";

const Profile: React.FC = () => {

  const updateCategories = useStore((state) => state.updateCategories);
  const isDialogOpenForDeleteUser = useStore((state) => state.isDialogOpenForDeleteUser);
  const isDialogOpenForDeleteCategory = useStore((state) => state.isDialogOpenForDeleteCategory);

  updateCategories()

  return (
    <div className={s.settings_item}>
      <div className={s.container}>
        {isDialogOpenForDeleteUser && ( <Confirnation/>)}
        {isDialogOpenForDeleteCategory && ( <Confirnation/>)}
        <div className={s.content}>
          <UserInfo/>
          <CategoryList/>
        </div>
      </div>
    </div>
  )
}

export default Profile