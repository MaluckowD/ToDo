import s1 from "./EditCategory.module.css"
import s from "../Modals.module.css"
import useStore from "../../../store/useToDoStore.js";

const EditCategory = (props) => {
  console.log(props.categoryId)
  const closeModalEditCat = useStore((state) => state.closeModalEditCat);
  const changeCategoryNameState = useStore((state) => state.changeCategoryNameState);
  const categoryName = useStore((state) => state.categoryName);
  const color = useStore((state) => state.color);
  const handleColorChange = useStore((state) => state.handleColorChange);
  const categoryId = useStore((state) => state.categoryId);
  const error = useStore((state) => state.error);
  const onEditCategory = useStore((state) => state.onEditCategory);
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

        {error && <p style={{ width: "350px", marginBottom: "10px" }} className="text-red-500 text-center">{props.error}</p>}
        <button className={s.closeModalCategory} onClick={() => onEditCategory(categoryId)}>Редактировать</button>
        <button className={s.closeModalCategory} onClick={closeModalEditCat}>Выйти</button>
      </div>
    </div>
  )
}

export default EditCategory