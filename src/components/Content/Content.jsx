import Header from "./Header/Header"
import Main from "./Main/Main"
import Footer from "./Footer/Footer"
import s from "./Content.module.css"
const Content = () => {

  return(
    <div className={s.wrapper}>
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default Content