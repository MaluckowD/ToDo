import React from "react";
import s1 from "./Kirill.module.css";
import s from "../Modals.module.css";
import kirill from "../../../images/Кирилл2.jpg";
import useStore from "../../../store/useToDoStore";
import { IProps } from "../../../types/propsModals";

const Kirill: React.FC<IProps> = React.memo(
  ({ modalRef }) => {
    const closeModal = useStore((state) => state.closeModal);

    return (
      <div className={[s.modal, s1.Kirill].join(" ")} ref={modalRef}>
        <div className={[s.modalcontent, s1.modalcontent].join(" ")}>
          <img className={s.modalcontent_image} src={kirill} alt="Кирилл"></img>
          <p style={{ color: "#000" }}>КИРИЛЛ ЛОХ</p>
          <button className={s.close} onClick={closeModal}>
            Выйти
          </button>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.modalRef === nextProps.modalRef
);

export default Kirill;
