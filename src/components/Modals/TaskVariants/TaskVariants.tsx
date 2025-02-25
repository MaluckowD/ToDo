import React from "react";
import s from "../Modals.module.css"
import useStore from "../../../store/useToDoStore.js";
import {IProps} from "../../../types/propsModals"

const TaskVariants: React.FC<IProps> = React.memo (
  ({ modalRef }) => {
    const deleteTaskDialog = useStore((state) => state.deleteTaskDialog);
    const closeIsOpenTask = useStore((state) => state.closeIsOpenTask);
    const TaskInfoOpen = useStore((state) => state.TaskInfoOpen);
    const TaskUpdateOpen = useStore((state) => state.TaskUpdateOpen);
    const taskId = useStore((state) => state.taskId);
    const changeTaskStatus = useStore((state) => state.changeTaskStatus);

    return (
      <div className={[s.modal, s.modal_categoryAdd].join(" ")} ref={modalRef}>
        <div className={s.modalcontent}>
          <button className={s.closeModalCategory} onClick={TaskInfoOpen}>
            Подробная информация
          </button>
          <button className={s.closeModalCategory} onClick={TaskUpdateOpen}>
            Редактировать задачу
          </button>
          <button className={s.closeModalCategory} onClick={() => changeTaskStatus(taskId)}>
            Изменить статус
          </button>
          <button className={s.closeModalCategory} onClick={deleteTaskDialog}>
            Удалить задачу
          </button>
          <button className={s.closeModalCategory} onClick={closeIsOpenTask}>Выйти</button>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.modalRef === nextProps.modalRef
);

export default TaskVariants