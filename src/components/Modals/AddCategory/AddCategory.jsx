import s1 from "./AddCategory.module.css"
import s from "../Modals.module.css"
import useStore from "../../../store/useToDoStore.js";

const AddCategory = (props) => {
  const closeModalCat = useStore((state) => state.closeModalCat);
  const changeCategoryNameState = useStore((state) => state.changeCategoryNameState);
  const categoryName = useStore((state) => state.categoryName);
  const color = useStore((state) => state.color);
  const handleColorChange = useStore((state) => state.handleColorChange);
  
  return (
    <div className={[s.modal, s.modal_categoryAdd].join(" ")} ref={props.modalRef}>
      <div className={s.modalcontent}>
        <input className={[s.categoryName, s1.categoryNamemodificate].join(" ")}
          maxlength='50'
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
        {props.error && <p style={{ width: "400px", marginBottom: "10px" }} className="text-red-500 text-center">{props.error}</p>}
        <button className={s.closeModalCategory} onClick={props.closeModalCategory}>Добавить категорию</button>
        <button className={s.closeModalCategory} onClick={closeModalCat}>Выйти</button>
      </div>
    </div>
  )
}

export default AddCategory