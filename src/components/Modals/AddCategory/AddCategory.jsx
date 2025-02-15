import s from "./AddCategory.module.css"

const AddCategory = (props) => {
  return (
    <div className={[s.modal, s.modal_categoryAdd].join(" ")} ref={props.modalRef}>
      <div className={s.modalcontent}>
        <input className={[s.categoryName, s.categoryNamemodificate].join(" ")}
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
        {props.error && <p style={{ width: "400px", marginBottom: "10px" }} className="text-red-500 text-center">{props.error}</p>}
        <button className={s.closeModalCategory} onClick={props.closeModalCategory}>Добавить категорию</button>
        <button className={s.closeModalCategory} onClick={props.closeModalCat}>Выйти</button>
      </div>
    </div>
  )
}

export default AddCategory