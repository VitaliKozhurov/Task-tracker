import { AxiosResponse } from 'axios';
import { instance, ResponseType } from 'common/api/api';
import { TaskPriorities, TaskStatuses } from 'common/enums';

export class TasksAPI {
    static getTasks(todoListID: string) {
        return instance.get<GetTasksResponseType, AxiosResponse<GetTasksResponseType>>(
            `todo-lists/${todoListID}/tasks`,
        );
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
export type TaskServerType = {
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
type GetTasksResponseType = {
    items: TaskServerType[];
    totalCount: number;
    error: null | string;
};
type TaskResponseType = {
    item: TaskServerType;
};
