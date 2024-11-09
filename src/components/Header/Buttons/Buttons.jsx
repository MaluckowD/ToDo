import s from "./Buttons.module.css"

const Buttons = () => {

  return (
    <div className={s.buttons_item}>
      <a href="" className={s.link_main}>Главная</a>
      <button className={s.exit}>Выйти</button>
    </div>

  )
}

export default Buttons