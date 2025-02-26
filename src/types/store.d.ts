import { IEvent } from "./events";
import { ITaskData, ITaskStatus, ITaskInfo, IUser, ICategory } from "./tasks";

export interface IStore {

    statusId: number,
    completed: undefined | boolean,
    userData: IUser | null,
    categories: ICategory[],
    tasks: ITask,
    isLoading: boolean,
    ERROR: null | string,
    events: IEvent[],
    month: number,
    year: number,
    numOfDays: number[],
    emptyDays: number[],
    name: string,
    isDialogOpenForDeleteUser: boolean,
    isDialogOpenForDeleteCategory: boolean,
    isDialogOpenForDeleteTask: boolean,
    DeleteUserDialog: () => void;
    deleteCategoryDialog: (id: number) => void;
    deleteTaskDialog: () => void;
    closeDeleteUserDialog: () => void,
    closeDeleteCategoryDialog: () => void,
    closeDeleteTaskDialog: () => void,
    changeName: (value: string) => void,
    deleteUser: () => void;
    handleKeyDown: (event: FormEvent) => void;
    handleClickOutside: (event: FormEvent, modalRef:MutableRefObject<HTMLElement | null>) => void
    nextMonth: () => void;
    prevMonth: () => void;
    handleDrop: (e: FormEvent, date: number, draggedItem:MutableRefObject<HTMLElement | null>, s) => Promise<void>;
    updateMonthYear: (newMonth, newYear) => void;
    goToCurrentMonth: () => void;
    getNoOfDays: () => void;
    handleDateChange: (event: FormEvent) => void;
    exit: () => void;
    deleteData:  (navigate: NavigateFunction) => void;

    handleNewData: (incomingData) => Promise<void> | Promise<null>;
    openTaskInfoS: (e: FormEvent) => void;
    
    taskStatuses: {},
    getToken: string | null,
    token: string | null,
    setToken: (token) => void;
    saveToken: (token) => void;
    
    removeToken: () => void;
    fetchCategories: () => Promise<void>;
    fetchUserData: () => Promise<void>;
    fetchCategoriesNoBase: () => Promise<void>;
    updateCategories: () => Promise<void>;
    onEditCategory: (id: number) => Promise<void>;
    closeModalCategoryApi: () => Promise<void>;
    
    updateTask: () => Promise<void>;
    changeTask: (id: number) => Promise<void>;
    
    isOpenTaskInfo: boolean
    isModalCategoryOpen: boolean
    openModalCategory: () => void
    closeModalCategory: () => void
    closeModalCat: () => void
    isEditCategoryOpen: boolean,
    isModalOpen: boolean,
    openModal: () => void,
    closeModal: () => void,
    isTaskOpen: boolean,
    isTaskUpdateOpen: boolean,
    isTaskInfoOpen: boolean,
    isWarningOpen: boolean,
    
    TaskInfoOpen: () => void
    closeTaskInfoOpen: () => void;
    TaskUpdateOpen: () => void;
    closeTaskUpdateOpen: () => void;
    
    taskName: string,
    changeTaskName: (value:string) => void,
    taskDescription: string,
    changeTaskDescription: (value: string) => void,
    taskPriority: number,
    categoryName: string,
    date: string,
    changeDate: (value:string) => void,
    selectedCategoryId: string,
    handleCategoryChange: (value: number) => void,
    openTaskInfoState: (formattedDate: string) => void
    handlePriorityChange: (value: number) => void
    
    closeIsOpenTaskInfo: () => void;
    color: string,
    closeModalEditCat: () => void;
    categoryId: number,
    openModalEditCategory: (id: number) => void
    getTaskInfo: (id: number) => Promise<void>;
    changeTaskStatus: (id: number) => Promise<void>;
    openWarning: () => void;
    exitWarning: () => void;
    closeIsOpenTask: () => void;

    taskId: number,
    changeTaskId: (id: number) => void,
    updateTasks: () => Promise<void>;
      
    addTask: () => Promise<void>;
    getTaskStatus: (taskId: number) => ITaskStatus
    deleteTask: (id) => Promise<void>;
    getTaskInfoState: (taskData: ITaskData, categoryId: number) => void;
    deleteCategory: (id: number) => Promise<void>;
    deleteTaskState: () => void;

    changeCategoryNameState: (value: string) => void;
    handleColorChange: (value: string) => void,
    closeModalCategoryState: () => void;
    avatarUrl: string,
    getAvatarUrl: () => Promise<string>
    loadAvatar: () => Promise<void>;
    UpdateUserInfo: (name: string, surname: string, gender: string) => Promise<void>,
    handleFileChange: (event: FormEvent) => Promise<void>

}