import {
    FilterType,
    getTodoLists,
    todoListsActions,
    TodoListsInitialStateType,
    todoListsReducer,
    todoListsThunks,
} from 'features/todoLists/todoListSlice';
import { EntityStatus } from 'app/appSlice';
import { TodoListServerType } from 'features/todoLists/todoListsApi';

describe('TodoLists reducer tests', () => {
    let todoListsState: TodoListsInitialStateType;

    beforeEach(() => {
        todoListsState = [
            {
                id: 'todo_1',
                title: 'First_todo',
                addedDate: '',
                order: 1,
                filter: FilterType.ALL,
                entityStatus: EntityStatus.IDLE,
            },
            {
                id: 'todo_2',
                title: 'Second_todo',
                addedDate: '',
                order: 2,
                filter: FilterType.ALL,
                entityStatus: EntityStatus.IDLE,
            },
        ];
    });

    it('Should add new todo list', () => {
        const newTodo = { todoList: { id: 'todo_3', title: 'Third_todo', addedDate: '', order: 3 } };
        const action = todoListsThunks.createTodoList.fulfilled(newTodo, 'requestId', { title: 'Third_todo' });
        const newTodoListState = todoListsReducer(todoListsState, action);
        expect(newTodoListState.length).toBe(3);
        expect(newTodoListState[0].id).toBe('todo_3');
        expect(newTodoListState[0].filter).toBe(FilterType.ALL);
        expect(newTodoListState[0].entityStatus).toBe(EntityStatus.IDLE);
    });

    it('Should remove todolist', () => {
        const todoListId = { todoListID: 'todo_1' };
        const action = todoListsThunks.deleteTodoList.fulfilled(todoListId, 'requestId', todoListId);
        const newTodoListState = todoListsReducer(todoListsState, action);

        expect(newTodoListState.length).toBe(1);
        expect(newTodoListState[0].id).toBe('todo_2');
        expect(newTodoListState[0].title).toBe('Second_todo');
    });

    it('Should change todo list title', () => {
        const payload = {
            todoListID: 'todo_2',
            title: {
                title: 'New_title',
            },
        };
        const action = todoListsThunks.updateTodoListTitle.fulfilled(payload, 'requestId', payload);

        const newTodoListState = todoListsReducer(todoListsState, action);

        expect(newTodoListState[1].title).toBe('New_title');
        expect(newTodoListState[0].title).toBe('First_todo');
    });

    it('Should change todo list filter', () => {
        const newTodoListState = todoListsReducer(
            todoListsState,
            todoListsActions.changeTodoListFilter({ todoListID: 'todo_2', filter: FilterType.ACTIVE }),
        );

        expect(newTodoListState[1].filter).toBe(FilterType.ACTIVE);
        expect(newTodoListState[0].filter).toBe(FilterType.ALL);
    });

    it('Should change todo entity status', () => {
        const newTodoListState = todoListsReducer(
            todoListsState,
            todoListsActions.changeTodoListEntityStatus({
                todoListID: 'todo_2',
                entityStatus: EntityStatus.LOADING,
            }),
        );

        expect(newTodoListState[1].entityStatus).toBe(EntityStatus.LOADING);
        expect(newTodoListState[0].entityStatus).toBe(EntityStatus.IDLE);
    });

    it('Should set todo lists', () => {
        const todoLists = [
            {
                id: 'todo_1',
                title: 'First_todo',
                addedDate: '',
                order: 1,
            },
            {
                id: 'todo_2',
                title: 'Second_todo',
                addedDate: '',
                order: 2,
            },
        ];
        const action = todoListsThunks.getTodoLists.fulfilled({ todoLists }, 'requestId');
        const newTodoListState = todoListsReducer([], action);

        expect(newTodoListState.length).toBe(2);
        expect(newTodoListState[0].title).toBe('First_todo');
        expect(newTodoListState[0].filter).toBe(FilterType.ALL);
        expect(newTodoListState[0].entityStatus).toBe(EntityStatus.IDLE);
    });
});
