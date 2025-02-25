import React from "react";
import s1 from "./AddCategory.module.css"
import s from "../Modals.module.css"
import useStore from "../../../store/useToDoStore.js";
import {IProps} from "../../../types/propsModals"

const AddCategory: React.FC<IProps> = React.memo (
  ({ modalRef }) => {
    const closeModalCat = useStore((state) => state.closeModalCat);
    const changeCategoryNameState = useStore((state) => state.changeCategoryNameState);
    const categoryName = useStore((state) => state.categoryName);
    const color = useStore((state) => state.color);
    const handleColorChange = useStore((state) => state.handleColorChange);
    const ERROR = useStore((state) => state.ERROR);
    const closeModalCategoryApi = useStore((state) => state.closeModalCategoryApi);

    return (
      <div className={[s.modal, s.modal_categoryAdd].join(" ")} ref={modalRef}>
        <div className={s.modalcontent}>
          <input className={[s.categoryName, s1.categoryNamemodificate].join(" ")}
            maxLength= {50}
            type="text"
            value={categoryName}
            onChange={(e) => changeCategoryNameState(e.target.value)}
            placeholder="Введите название категории"
          />
  
          <h2 className={s.description_color}>Выберите цвет</h2>
          <input
            type="color"
            id="colorPicker"
            value={color}
            onChange={(e) => handleColorChange(e.target.value)}
          />
          {ERROR && <p style={{ width: "400px", marginBottom: "10px" }} className="text-red-500 text-center">{ERROR}</p>}
          <button className={s.closeModalCategory} onClick={closeModalCategoryApi}>Добавить категорию</button>
          <button className={s.closeModalCategory} onClick={closeModalCat}>Выйти</button>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.modalRef === nextProps.modalRef
);

export default AddCategory
  
  