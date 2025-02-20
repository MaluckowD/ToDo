import s from "../Modals.module.css"
import s1 from "./AboutTask.module.css"
import useStore from "../../../store/useToDoStore.js";
const AboutTask = (props) => {
  const taskName = useStore((state) => state.taskName);
  const changeTaskName = useStore((state) => state.changeTaskName);
  const taskDescription = useStore((state) => state.taskDescription);
  const changeTaskDescription = useStore((state) => state.changeTaskDescription)
  const date = useStore((state) => state.date)
  const changeDate = useStore((state) => state.changeDate)
  const selectedCategoryId = useStore((state) => state.selectedCategoryId);
  const handleCategoryChange = useStore((state) => state.handleCategoryChange);
  const taskPriority = useStore((state) => state.taskPriority);
  const handlePriorityChange = useStore((state) => state.handlePriorityChange)
  const categories = useStore((state) => state.categories)

  return (
    <div className={[s.modal, s1.module].join(" ")} ref={props.propsmodalRef}>
      <div className={s.modalcontent}>
        <input className={s.categoryName}
          maxlength='50'
          disabled
          type="text"
          value={taskName}
          onChange={(e) => changeTaskName(e.target.value)}
          placeholder="Введите название для задачи"
        />
        <textarea className={s.taskDescription}
          maxlength='500'
          disabled
          type="text"
          value={taskDescription}
          onChange={(e) => changeTaskDescription(e.target.value)}
          placeholder="Описание"
        />
        <input className={[s.categoryName, s.taskdate].join(" ")}
          disabled
          style={
            { color: "#000" }
          }
          type="date"
          value={date}
          onChange={(e) => changeDate(e.target.value)}
          placeholder="Дата задачи"
        />
        <select className={s.taskinfo} disabled style={
          { color: "#000" }
        } value={selectedCategoryId} onChange={(e) => handleCategoryChange(e.target.value)}>
          <option disabled value="">Выберите категорию</option>
          {categories.map((category) => (
            <option style={{ backgroundColor: category.color }} key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select disabled
          className={s.taskinfo}
          style={{ color: "#000" }}
          value={taskPriority}
          onChange={(e) => handlePriorityChange(e.target.value)}
        >
          <option disabled value="">Выберите приоритет</option>
          <option style={{ backgroundColor: "#EB0000" }} value={1}>Высокий</option>
          <option style={{ backgroundColor: "#E8E230" }} value={2}>Средний</option>
          <option style={{ backgroundColor: "#3FAB30" }} value={3}>Низкий</option>
        </select>
        <input className={s.categoryName}
          style={{ textAlign: "center" }}
          type="text"
          disabled
          value={props.completed ? "Выполнена" : "Не выполнена"}
        />
        <button className={s.closeModalCategory} onClick={props.closeTaskInfoOpen}>Выйти</button>
      </div>
    </div>
  )
}

export default AboutTask