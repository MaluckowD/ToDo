interface ITask {
    id: number;
    name: string;
    description: string;
    priority: number;
    completed: boolean;
    category_id: number;
    date: string;
  }
  
interface ICategory {
    id: number;
    name: string;
    color: string;
    tasks: Task[];
}

interface IUser {
    id: number;
    name: string;
    surname: string;
    short_name: string;
    email: string;
    gender: string;
    tasks: Task[];
    categories: Category[];
}

export interface ITaskData {
    name: string,
    description: string,
    priority: number,
    category_id: number,
    date: string,
}

export interface ITaskStatus {
    completed: boolean; 
    statusId: number
}
