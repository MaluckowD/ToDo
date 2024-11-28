import s from "./Footer.module.css"


const Footer = (props) => {

  return (
    <footer className={s.footer}>
      <div className={ s.footer_content}>
        <button onClick={props.openModal} className={s.description}>КИРИЛЛ ЛОХ</button>
        <div className={s.links}>
          <a href="#">Наш tg бот</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer