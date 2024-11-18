import s from "./CategoryList.module.css"

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
            <img src= "image.svg"/>
            <img src="close.svg" />
          </div>
          <div className={s.list_item}>
            <input />
            <img src="image.svg" />
            <img src="close.svg" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryList