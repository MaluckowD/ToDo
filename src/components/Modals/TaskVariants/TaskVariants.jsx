import s from "../Modals.module.css"
const TaskVariants = (props) => {
  return (
    <div className={[s.modal, s.modal_categoryAdd].join(" ")} ref={props.propsmodalRef}>
      <div className={s.modalcontent}>
        <button className={s.closeModalCategory} onClick={props.TaskInfoOpen}>
          Подробная информация
        </button>
        <button className={s.closeModalCategory} onClick={props.TaskUpdateOpen}>
          Редактировать задачу
        </button>
        <button className={s.closeModalCategory} onClick={() => props.changeTaskStatus(
          props.taskId)}>
          Изменить статус
        </button>
        <button className={s.closeModalCategory} onClick={props.openWarning}>
          Удалить задачу
        </button>
        <button className={s.closeModalCategory} onClick={props.closeIsOpenTask}>Выйти</button>
      </div>
    </div>
  )
}

export default TaskVariants