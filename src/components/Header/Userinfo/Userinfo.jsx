import s from "./Userinfo.module.css"

const Userinfo = () => {

  return (
    <div className={s.header_infouser}>
      <img className={s.photo} src="../../../user.png" alt="" />
      <div className={s.username}> Igor </div>
    </div>
  )
}

export default Userinfo