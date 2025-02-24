import s from "./Footer.module.css"
import useStore from "../../../store/useToDoStore.js"

const Footer: React.FC = () => {
  const openModal = useStore((state) => state.openModal);

  return (
    <footer className={s.footer}>
      <div className={s.footer_content}>
        <button onClick={openModal} className={s.description}>Кирилл лох</button>
        <div className={s.links}>
          <a href="https://t.me/todo_cerber_bot" target="_blank" rel="noopener noreferrer">Наш tg бот</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer