import s from "./CategoryList.module.css"
import close from "../../../../../images/close.svg"
import image from "../../../../../images/image.svg"
const CategoryList = (props) => {
  console.log(props.categories)
  return (
    <div className={s.categorylist}>
      <div className={s.btn}>
        <button onClick={props.openModalCategory}>Добавить категорию</button>
      </div>
      <div className={s.list}>
        <div className={s.list_items}>
          {props.categories.map( (item) => (
            <div className={s.list_item}>
              <input style={{ backgroundColor: item.color }} value = {item.name}/>
              <img src={image} />
              <img src={close} />
            </div>
          ))}
          
        </div>
      </div>
    </div>
  )
}

export default CategoryList