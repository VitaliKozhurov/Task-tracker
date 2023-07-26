import { AxiosResponse } from 'axios';
import { instance, ResponseType } from 'common/api/api';

export class TodoListsApi {
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

export type TodoListServerType = {
    id: string;
    title: string;
    addedDate: string;
    order: number;
};

type CreateTodoListType = {
    item: {
        id: string;
        title: string;
        addedDate: string;
        order: number;
    };
};
