import s from "./Footer.module.css"

interface FooterProps  {
  openModal: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Footer: React.FC<FooterProps> = (props: FooterProps) => {
  return (
    <footer className={s.footer}>
      <div className={s.footer_content}>
        <button onClick={props.openModal} className={s.description}>Кирилл лох</button>
        <div className={s.links}>
          <a href="https://t.me/todo_cerber_bot" target="_blank" rel="noopener noreferrer">Наш tg бот</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer