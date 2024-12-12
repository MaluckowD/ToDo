import s from "./CategoryList.module.css"
import close from "../../../../../images/close.svg"
import image from "../../../../../images/image.svg"
import axios from "axios"
const CategoryList = (props) => {
  console.log(props.categories)
  const token = props.getToken()
  const deleteCategory = (id) => {
    if (token){
      axios.delete(`https://energy-cerber.ru/api/v1/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        console.log(response.data)
        props.updateCategories();
      })
    }
  }
  
  return (
    <div className={s.categorylist}>
      <div className={s.btn}>
        <button onClick={props.openModalCategory}>Добавить категорию</button>
      </div>
      <div className={s.list}>
        <div className={s.list_items}>
          {props.categories.map( (item) => (
            <div className={s.list_item}>
              <input disabled style={{ backgroundColor: item.color }} value = {item.name}/>
              <img onClick={() => props.openModalEditCategory(item.id)} src={image} />
              <img onClick={() => deleteCategory(item.id)} src={close} />
            </div>
          ))}
          
        </div>
      </div>
    </div>
  )
}

export default CategoryList