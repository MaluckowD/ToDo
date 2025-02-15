import s from "../Modals.module.css"

const AddTask = (props) => {
  return (
    <div className={s.modal} ref={props.modalRef}>
      <div className={s.modalcontent}>
        <input className={s.categoryName}
          maxlength='50'
          type="text"
          value={props.taskName}
          onChange={(e) => props.setTaskName(e.target.value)}
          placeholder="Введите название для задачи"
        />
        <textarea className={s.taskDescription}
          maxlength='500'
          type="text"
          value={props.taskDescription}
          onChange={(e) => props.setTaskDescription(e.target.value)}
          placeholder="Описание"
        />
        <input className={s.categoryName}
          style={{ color: "#000" }}
          type="date"
          value={props.date}
          onChange={(e) => props.setDate(e.target.value)}
          placeholder="Дата задачи"
        />
        <select style={{ color: "#000" }} value={props.selectedCategoryId} 
          onChange={props.handleCategoryChange}>
          <option value="" disabled>Выберите категорию</option>
          {props.categories.map((category) => (
            <option style={{ backgroundColor: category.color }} key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          style={{ color: "#000" }}
          value={props.taskPriority}
          onChange={props.handlePriorityChange}
        >
          <option value="" disabled>Выберите приоритет</option>
          <option style={{ backgroundColor: "#EB0000" }} value={1}>Высокий</option>
          <option style={{ backgroundColor: "#E8E230" }} value={2}>Средний</option>
          <option style={{ backgroundColor: "#3FAB30" }} value={3}>Низкий</option>
        </select>
        {props.error && <p style={{ width: "400px", marginBottom: "10px" }} className="text-red-500 text-center">{props.error}</p>}
        <button className={s.closeModalCategory} onClick={props.addTask}>
          Добавить задачу
        </button>
        <button className={s.closeModalCategory} onClick={props.closeIsOpenTaskInfo}>Выйти</button>
      </div>
    </div>
  )
}

export default AddTask