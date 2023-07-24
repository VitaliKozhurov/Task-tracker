import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
});

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}

export class AuthAPI {
    static authMe() {
        return instance.get<ResponseType<AuthResponseType>>('auth/me');
    }

    static login(data: LoginRequestType) {
        return instance.post<
            ResponseType<LoginResponseType>,
            AxiosResponse<ResponseType<LoginResponseType>>,
            LoginRequestType
        >('auth/login', data);
    }

    static logout() {
        return instance.delete<ResponseType>('auth/login');
    }
}

export class TodoListAPI {
    static getTodoLists() {
        return instance.get<TodoListServerType>('todo-lists');
    }

    static createTodoList(data: { title: string }) {
        return instance.post<
            ResponseType<CreateTodoListType>,
            AxiosResponse<ResponseType<AxiosResponse>>,
            { title: string }
        >('todo-lists', data);
    }

    static updateTodoList(todoListID: string, title: { title: string }) {
        return instance.put<ResponseType, AxiosResponse<ResponseType>, { title: string }>(
            `todo-lists/${todoListID}`,
            title,
        );
    }

    static deleteTodoList(todoListID: string) {
        return instance.delete(`todo-lists/${todoListID}`);
    }

    static reorderTodoList(todoListID: string, data: { putAfterItemId: string }) {
        return instance.put<ResponseType, AxiosResponse<ResponseType>, { putAfterItemId: string }>(
            `todo-lists/${todoListID}/reorder`,
            data,
        );
    }
}

export class TasksAPI {
    static getTasks(todoListID: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todoListID}/tasks`);
    }

    static createTask(todoListID: string, title: { title: string }) {
        return instance.post<
            ResponseType<TaskResponseType>,
            AxiosResponse<ResponseType<TaskResponseType>>,
            { title: string }
        >(`todo-lists/${todoListID}/tasks`, title);
    }

    static updateTask(todoListID: string, taskID: string, data: UpdateTaskModelType) {
        return instance.put<
            ResponseType<TaskResponseType>,
            AxiosResponse<ResponseType<TaskResponseType>>,
            UpdateTaskModelType
        >(`todo-lists/${todoListID}/${taskID}`, data);
    }

    static deleteTask(todoListID: string, taskID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListID}/tasks/${taskID}`);
    }

    static reorderTask(todoListID: string, taskID: string, data: { putAfterItemId: string }) {
        return instance.put<ResponseType>(`todo-lists/${todoListID}/tasks/${taskID}`);
    }
}

export type TodoListServerType = {
    id: string;
    title: string;
    addedDate: string;
    order: number;
};
export type TaskType = {
    description: string;
    title: string;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
    id: string;
    todoListId: string;
    order: number;
    addedDate: string;
};
export type UpdateTaskModelType = {
    title: string;
    description: string;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
};
export type ResponseType<T = {}> = {
    resultCode: number;
    messages: string[];
    data: T;
};
type AuthResponseType = {
    id: number;
    email: string;
    login: string;
};
export type LoginRequestType = {
    email: string;
    password: string;
    rememberMe?: boolean;
};
type LoginResponseType = {
    userId: number;
};
type CreateTodoListType = {
    item: {
        id: string;
        title: string;
        addedDate: string;
        order: number;
    };
};
type GetTasksResponseType = {
    items: TaskType[];
    totalCount: number;
    error: null | string;
};
type TaskResponseType = {
    data: {
        item: TaskType;
    };
};
