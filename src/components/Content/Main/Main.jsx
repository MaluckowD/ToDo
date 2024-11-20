import s from "./Main.module.css"
import Settings from "./Settings/Settings"
import Calendar from "./Calendar/Calendar"
const Main = () => {

  return (
    <main className = {s.main}>
      <Calendar/>
      <Settings/>
    </main>
  )
}

export default Main