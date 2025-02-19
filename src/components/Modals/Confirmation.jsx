import s from "./Confirmation.module.css"
import useStore from "../../store/useToDoStore.js";
const Confirnation = (props) => {
  const exitWarning = useStore((state) => state.exitWarning);
  return (
    <div className={[s.modal].join(" ")} >
      <div className= {s.container}>
        <p>Вы уверены?</p>
        <div className={s.modalcontent}>
          <button className={s.closeModalCategory} onClick={exitWarning}>
            Выйти
          </button>
          <button className={s.close} onClick={props.DeleteUser}>
            Удалить
          </button>
        </div>
      </div>
      
    </div>
  )

}

export default Confirnation
