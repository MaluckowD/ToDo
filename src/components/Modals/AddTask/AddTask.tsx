import React from "react";
import s from "../Modals.module.css"
import useStore from "../../../store/useToDoStore";
import {IProps} from "../../../types/propsModals.js"

const AddTask: React.FC<IProps> = React.memo (
  ({ modalRef }) => {
    
    const closeIsOpenTaskInfo = useStore((state) => state.closeIsOpenTaskInfo);
    const changeTaskName = useStore((state) => state.changeTaskName);
    const taskName = useStore((state) => state.taskName);
    const taskDescription = useStore((state) => state.taskDescription);
    const changeTaskDescription = useStore((state) => state.changeTaskDescription)
    const date = useStore((state) => state.date)
    const changeDate = useStore((state) => state.changeDate)
    const selectedCategoryId = useStore((state) => state.selectedCategoryId);
    const handleCategoryChange = useStore((state) => state.handleCategoryChange);
    const taskPriority = useStore((state) => state.taskPriority);
    const handlePriorityChange = useStore((state) => state.handlePriorityChange)
    const categories = useStore((state) => state.categories)
    const ERROR = useStore((state) => state.ERROR)
    const addTask = useStore((state) => state.addTask);

    return (
      <div className={s.modal} ref={modalRef}>
        <div className={s.modalcontent}>
          <input className={s.categoryName}
            maxLength={50}
            type="text"
            value={taskName}
            onChange={(e) => changeTaskName(e.target.value)}
            placeholder="Введите название для задачи"
          />
          <textarea className={s.taskDescription}
            maxLength={500}
            value={taskDescription}
            onChange={(e) => changeTaskDescription(e.target.value)}
            placeholder="Описание"
          />
          <input className={s.categoryName}
            style={{ color: "#000" }}
            type="date"
            value={date}
            onChange={(e) => changeDate(e.target.value)}
            placeholder="Дата задачи"
          />
          <select style={{ color: "#000" }} value={selectedCategoryId} 
            onChange={(e) => handleCategoryChange(parseInt(e.target.value, 10))}>
            <option value="" disabled>Выберите категорию</option>
            {categories.map((category) => (
              <option style={{ backgroundColor: category.color }} key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            style={{ color: "#000" }}
            value={taskPriority}
            onChange={(e) => handlePriorityChange(parseInt(e.target.value, 10))}
          >
            <option value="" disabled>Выберите приоритет</option>
            <option style={{ backgroundColor: "#EB0000" }} value={1}>Высокий</option>
            <option style={{ backgroundColor: "#E8E230" }} value={2}>Средний</option>
            <option style={{ backgroundColor: "#3FAB30" }} value={3}>Низкий</option>
          </select>
          {ERROR && <p style={{ width: "350px", marginBottom: "10px" }} className="text-red-500 text-center">{ERROR}</p>}
          <button className={s.closeModalCategory} onClick={addTask}>
            Добавить задачу
          </button>
          <button className={s.closeModalCategory} onClick={closeIsOpenTaskInfo}>Выйти</button>
        </div>
      </div>
    )
  }, (prevProps, nextProps) => prevProps.modalRef === nextProps.modalRef
)

export default AddTask