import s from "./CategoryList.module.css"
import close from "../../../../../images/close.svg"
import image from "../../../../../images/image.svg"
import useStore from "../../../../../store/useToDoStore.js";
const CategoryList = (props) => {

  const openModalCategory = useStore((state) => state.openModalCategory);
  const openModalEditCategory = useStore((state) => state.openModalEditCategory);
  const deleteCategoryDialog = useStore((state) => state.deleteCategoryDialog);
  const categories = useStore((state) => state.categories);

  return (
    <div className={s.categorylist}>
      <div className={s.btn}>
        <button onClick={openModalCategory}>Добавить категорию</button>
      </div>
      <div className={s.list}>
        <div className={s.list_items}>
          {categories.map( (item) => (
            <div className={s.list_item}>
              <textarea 
              disabled style={{ backgroundColor: item.color, minHeight: "30px" }} value = {item.name}/>
              <img onClick={() => openModalEditCategory(item.id)} src={image} />
              <img onClick={() => deleteCategoryDialog(item.id)} src={close} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryList