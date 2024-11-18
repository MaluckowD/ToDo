import s from "./Footer.module.css"

const Footer = () => {

  return (
    <footer className={s.footer}>
      <div className={ s.footer_content}>
          
        <div className={s.description}>Кирилл лох(добавь кнопку)</div>
        <div className={s.links}>
          <a href="#">Наш tg бот</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer