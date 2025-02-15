import s from "./KirillLoh.module.css"
import Kirillloh from "../../../images/Кирилл2.jpg"
import Ville from "../../../images/Vinne.jpg"
const KirillLoh = (props) => {
  return (
    <div className={[s.modal, s.Kirillloh].join(" ")} ref={props.modalRef}>
      <div className={s.modalcontent}>
        <img classNane={s.modalcontent_image} src={Kirillloh}></img>
        <p style={{ color: "#000" }}>КИРИЛЛ ЛОХ</p>
        <button className={s.close} onClick={props.closeModal}>Выйти</button>
      </div>
    </div>
  )
}

export default KirillLoh