import React, { useRef } from "react";
import s1 from "./KirillLoh.module.css";
import s from "../Modals.module.css";
import Kirillloh from "../../../images/Кирилл2.jpg";
import Ville from "../../../images/Vinne.jpg";
import useStore from "../../../store/useToDoStore.js";
import {IProps} from "../../../types/propsModals"

const KirillLoh: React.FC<IProps> = React.memo(
  ({ modalRef }) => {
    const closeModal = useStore((state) => state.closeModal);

    return (
      <div className={[s.modal, s1.Kirillloh].join(" ")} ref={modalRef}>
        <div className={[s.modalcontent, s1.modalcontent].join(" ")}>
          <img className={s.modalcontent_image} src={Kirillloh} alt="Кирилл"></img>
          <p style={{ color: "#000" }}>КИРИЛЛ ЛОХ</p>
          <button className={s.close} onClick={closeModal}>Выйти</button>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.modalRef === nextProps.modalRef
);

export default KirillLoh;