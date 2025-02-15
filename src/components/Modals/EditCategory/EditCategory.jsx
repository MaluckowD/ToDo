import s1 from "./EditCategory.module.css"
import s from "../Modals.module.css"

const EditCategory = (props) => {
  console.log(props.categoryId)
  return (
    <div className={[s.modal, s.modal_categoryAdd].join(" ")} ref={props.modalRef}>
      <div className={s.modalcontent}>

        <input className={[s.categoryName, s1.categoryNamemodificate].join(" ")}
          maxlength='50'
          type="text"
          value={props.categoryName}
          onChange={(e) => props.setCategoryName(e.target.value)}
          placeholder="Введите название категории"
        />

        <h2 className={s.description_color}>Выберите цвет</h2>
        <input
          type="color"
          id="colorPicker"
          value={props.color}
          onChange={props.handleColorChange}
        />

        {props.error && <p style={{ width: "350px", marginBottom: "10px" }} className="text-red-500 text-center">{props.error}</p>}
        <button className={s.closeModalCategory} onClick={() => props.onEditCategory(props.categoryId)}>Редактировать</button>
        <button className={s.closeModalCategory} onClick={props.closeModalEditCat}>Выйти</button>
      </div>
    </div>
  )
}

export default EditCategory