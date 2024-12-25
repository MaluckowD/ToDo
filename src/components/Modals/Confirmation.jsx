import s from "./Confirmation.module.css"

const Confirnation = (props) => {

  return (
    <div className={[s.modal].join(" ")} >
      <div className= {s.container}>
        <p>Вы уверены?</p>
        <div className={s.modalcontent}>
          <button className={s.closeModalCategory} onClick={props.exit}>
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
