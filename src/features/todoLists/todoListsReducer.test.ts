import {
    FilterValueType,
    todoListsActions,
    TodoListsInitialStateType,
    todoListsReducer,
} from 'features/todoLists/todoListSlice';
import { RequestStatusType } from 'app/appSlice';

describe('TodoLists reducer tests', () => {
    let todoListsState: TodoListsInitialStateType;

    beforeEach(() => {
        todoListsState = [
            {
                id: 'todo_1',
                title: 'First_todo',
                addedDate: '',
                order: 1,
                filter: FilterValueType.ALL,
                entityStatus: RequestStatusType.IDLE,
            },
            {
                id: 'todo_2',
                title: 'Second_todo',
                addedDate: '',
                order: 2,
                filter: FilterValueType.ALL,
                entityStatus: RequestStatusType.IDLE,
            },
        ];
    });

    it('Should add new todo list', () => {
        const newTodoListState = todoListsReducer(
            todoListsState,
            todoListsActions.addTodoList({ todoList: { id: 'todo_3', title: 'Third_todo', addedDate: '', order: 3 } }),
        );
        expect(newTodoListState.length).toBe(3);
        expect(newTodoListState[0].id).toBe('todo_3');
        expect(newTodoListState[0].filter).toBe(FilterValueType.ALL);
        expect(newTodoListState[0].entityStatus).toBe(RequestStatusType.IDLE);
    });

    it('Should remove todolist', () => {
        const newTodoListState = todoListsReducer(
            todoListsState,
            todoListsActions.removeTodoList({ todoListID: 'todo_1' }),
        );

        expect(newTodoListState.length).toBe(1);
        expect(newTodoListState[0].id).toBe('todo_2');
        expect(newTodoListState[0].title).toBe('Second_todo');
    });

    it('Should change todo list title', () => {
        const newTodoListState = todoListsReducer(
            todoListsState,
            todoListsActions.changeTodoListTitle({ todoListID: 'todo_2', title: 'New_title' }),
        );

        expect(newTodoListState[1].title).toBe('New_title');
        expect(newTodoListState[0].title).toBe('First_todo');
    });

    it('Should change todo list filter', () => {
        const newTodoListState = todoListsReducer(
            todoListsState,
            todoListsActions.changeTodoListFilter({ todoListID: 'todo_2', filter: FilterValueType.ACTIVE }),
        );

        expect(newTodoListState[1].filter).toBe(FilterValueType.ACTIVE);
        expect(newTodoListState[0].filter).toBe(FilterValueType.ALL);
    });

    it('Should change todo entity status', () => {
        const newTodoListState = todoListsReducer(
            todoListsState,
            todoListsActions.changeTodoListEntityStatus({
                todoListID: 'todo_2',
                entityStatus: RequestStatusType.LOADING,
            }),
        );

        expect(newTodoListState[1].entityStatus).toBe(RequestStatusType.LOADING);
        expect(newTodoListState[0].entityStatus).toBe(RequestStatusType.IDLE);
    });

    it('Should set todo lists', () => {
        const newTodoListState = todoListsReducer(
            [],
            todoListsActions.setTodoLists({
                todoLists: [
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
                ],
            }),
        );

        expect(newTodoListState.length).toBe(2);
        expect(newTodoListState[0].title).toBe('First_todo');
        expect(newTodoListState[0].filter).toBe(FilterValueType.ALL);
        expect(newTodoListState[0].entityStatus).toBe(RequestStatusType.IDLE);
    });
});
