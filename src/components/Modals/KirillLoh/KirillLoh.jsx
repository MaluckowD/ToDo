import s1 from "./KirillLoh.module.css"
import s from "../Modals.module.css"
import Kirillloh from "../../../images/Кирилл2.jpg"
import Ville from "../../../images/Vinne.jpg"
import useStore from "../../../store/useToDoStore.js";
const KirillLoh = (props) => {
  const closeModal = useStore((state) => state.closeModal);
  return (
    <div className={[s.modal, s1.Kirillloh].join(" ")} ref={props.modalRef}>
      <div className={[s.modalcontent, s1.modalcontent].join(" ")}>
        <img classNane={s.modalcontent_image} src={Kirillloh}></img>
        <p style={{ color: "#000" }}>КИРИЛЛ ЛОХ</p>
        <button className={s.close} onClick={closeModal}>Выйти</button>
      </div>
    </div>
  )
}

export default KirillLoh