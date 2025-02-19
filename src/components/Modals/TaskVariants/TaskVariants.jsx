import s from "../Modals.module.css"
import useStore from "../../../store/useToDoStore.js";
const TaskVariants = (props) => {
  const openWarning = useStore((state) => state.openWarning);
  const closeIsOpenTask = useStore((state) => state.closeIsOpenTask);
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
        <button className={s.closeModalCategory} onClick={openWarning}>
          Удалить задачу
        </button>
        <button className={s.closeModalCategory} onClick={closeIsOpenTask}>Выйти</button>
      </div>
    </div>
  )
}

export default TaskVariants