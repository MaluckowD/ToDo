import s from "../Modals.module.css"
import useStore from "../../../store/useToDoStore.js";
const TaskVariants = (props) => {
  const deleteTaskDialog = useStore((state) => state.deleteTaskDialog);
  const closeIsOpenTask = useStore((state) => state.closeIsOpenTask);
  const TaskInfoOpen = useStore((state) => state.TaskInfoOpen);
  const TaskUpdateOpen = useStore((state) => state.TaskUpdateOpen);
  const taskId = useStore((state) => state.taskId);
  const changeTaskStatus = useStore((state) => state.changeTaskStatus);
  return (
    <div className={[s.modal, s.modal_categoryAdd].join(" ")} ref={props.propsmodalRef}>
      <div className={s.modalcontent}>
        <button className={s.closeModalCategory} onClick={TaskInfoOpen}>
          Подробная информация
        </button>
        <button className={s.closeModalCategory} onClick={TaskUpdateOpen}>
          Редактировать задачу
        </button>
        <button className={s.closeModalCategory} onClick={() => changeTaskStatus(
          taskId)}>
          Изменить статус
        </button>
        <button className={s.closeModalCategory} onClick={deleteTaskDialog}>
          Удалить задачу
        </button>
        <button className={s.closeModalCategory} onClick={closeIsOpenTask}>Выйти</button>
      </div>
    </div>
  )
}

export default TaskVariants