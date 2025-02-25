import React from "react";
import s from "./Confirmation.module.css"
import useStore from "../../store/useToDoStore";
import { useNavigate } from "react-router-dom";

const Confirnation: React.FC = () => {

  const navigate = useNavigate()
  const exit = useStore((state) => state.exit);
  const deleteData = useStore((state) => state.deleteData);

  return (
    <div className={[s.modal].join(" ")} >
      <div className= {s.container}>
        <p>Вы уверены?</p>
        <div className={s.modalcontent}>
          <button className={s.closeModalCategory} onClick={exit}>
            Выйти
          </button>
          <button className={s.close} onClick={(e) => deleteData(navigate)}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  )
}

export default Confirnation
