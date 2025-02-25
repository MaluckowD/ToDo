export interface ITask {
    id: number;
    name: string;
    description: string;
    priority: number;
    completed: boolean;
    category_id: number;
    date: string;
  }
  
export interface ICategory {
    id: number;
    name: string;
    color: string;
    tasks: Task[];
}

export interface ICategoryAdd {
    name: string;
    color: string;
}

export interface IUser {
    id: number;
    name: string;
    surname: string;
    short_name: string;
    email: string;
    gender: string;
    tasks: Task[];
    categories: Category[];
}

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserData {
    name: string;
    surname: string;
    gender: string;
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

export interface IUserDataRegistration {
    name: string,
    surname: string,
    short_name: string,
    email: string,
    gender: string,
    password: string,
  };