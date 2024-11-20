import s from "./CategoryList.module.css"
import close from "../../../../../images/close.svg"
import image from "../../../../../images/image.svg"
const CategoryList = () => {
  return (
    <div className={s.categorylist}>
      <div className={s.btn}>
        <button>Добавить категорию</button>
      </div>
      <div className={s.list}>
        <div className={s.list_items}>
          <div className={s.list_item}>
            <input/>
            <img src= {image}/>
            <img src={close} />
          </div>
          <div className={s.list_item}>
            <input />
            <img src={image} />
            <img src={close} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryList