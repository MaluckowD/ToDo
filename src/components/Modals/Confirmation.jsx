import s from "./Confirmation.module.css"
import useStore from "../../store/useToDoStore.js";
import { useNavigate } from "react-router-dom";
const Confirnation = (props) => {
  const navigate = useNavigate()
  const deleteTask = useStore((state) => state.deleteTask);
  const taskId = useStore((state) => state.taskId);
  const categortId = useStore((state) => state.categortId);
  const deleteUser = useStore((state) => state.deleteUser);
  const isDialogOpenForDeleteUser = useStore((state) => state.isDialogOpenForDeleteUser);
  const closeDeleteCategoryDialog = useStore((state) => state.closeDeleteCategoryDialog);
  const closeDeleteUserDialog = useStore((state) => state.closeDeleteUserDialog);
  const isDialogOpenForDeleteCategory = useStore((state) => state.isDialogOpenForDeleteCategory);
  const isDialogOpenForDeleteTask = useStore((state) => state.isDialogOpenForDeleteTask);
  const closeDeleteTaskDialog = useStore((state) => state.closeDeleteTaskDialog);
  const deleteCategory = useStore((state) => state.deleteCategory);

  const exit = () => {
    if (isDialogOpenForDeleteUser === true){
      closeDeleteUserDialog()
    } else if (isDialogOpenForDeleteCategory === true) {
      closeDeleteCategoryDialog()
    } else if (isDialogOpenForDeleteTask === true) {
      closeDeleteTaskDialog()
    }
  }

  const deleteData = () => {
    if (isDialogOpenForDeleteUser === true) {
      deleteUser()
      navigate("/login");
    } else if (isDialogOpenForDeleteCategory === true) {
      deleteCategory(categortId)
    } else if (isDialogOpenForDeleteTask === true) {
      deleteTask(taskId)
    }
  }

  return (
    <div className={[s.modal].join(" ")} >
      <div className= {s.container}>
        <p>Вы уверены?</p>
        <div className={s.modalcontent}>
          <button className={s.closeModalCategory} onClick={exit}>
            Выйти
          </button>
          <button className={s.close} onClick={deleteData}>
            Удалить
          </button>
        </div>
      </div>
      
    </div>
  )

}

export default Confirnation
