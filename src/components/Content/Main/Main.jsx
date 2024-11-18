import s from "./Main.module.css"
import Settings from "./Settings/Settings"
const Main = () => {

  return (
    <main className = {s.main}>
      <Settings/>
    </main>
  )
}

export default Main