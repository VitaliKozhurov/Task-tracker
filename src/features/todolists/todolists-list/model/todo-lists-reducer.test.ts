import {
    FilterType,
    todoListsActions,
    TodoListsInitialStateType,
    todoListsReducer,
    todoListsThunks,
} from 'features/todolists/todolists-list/model/todo-lists-slice';
import { EntityStatus } from 'app/appSlice';

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
                isActive: false,
            },
            {
                id: 'todo_2',
                title: 'Second_todo',
                addedDate: '',
                order: 2,
                filter: FilterType.ALL,
                entityStatus: EntityStatus.IDLE,
                isActive: false,
            },
        ];
    });

    it('Should add new todo list', () => {
        const newTodo = { todoList: { id: 'todo_3', title: 'Third_todo', addedDate: '', order: 3 } };
        const action = { type: todoListsThunks.createTodoList.fulfilled.type, payload: newTodo };
        const newTodoListState = todoListsReducer(todoListsState, action);
        expect(newTodoListState.length).toBe(3);
        expect(newTodoListState[0].id).toBe('todo_3');
        expect(newTodoListState[0].filter).toBe(FilterType.ALL);
        expect(newTodoListState[0].entityStatus).toBe(EntityStatus.IDLE);
    });

    it('Should remove todolist', () => {
        const todoListId = { todoListID: 'todo_1' };
        const action = { type: todoListsThunks.deleteTodoList.fulfilled.type, payload: todoListId };
        const newTodoListState = todoListsReducer(todoListsState, action);
        expect(newTodoListState.length).toBe(1);
        expect(newTodoListState[0].id).toBe('todo_2');
        expect(newTodoListState[0].title).toBe('Second_todo');
    });

    it('Should change todo list title', () => {
        const changeTodoTitlePayload = {
            todoListID: 'todo_2',
            title: {
                title: 'New_title',
            },
        };
        const action = { type: todoListsThunks.updateTodoListTitle.fulfilled.type, payload: changeTodoTitlePayload };

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
        const action = { type: todoListsThunks.getTodoLists.fulfilled.type, payload: { todoLists } };

        const newTodoListState = todoListsReducer([], action);

        expect(newTodoListState.length).toBe(2);
        expect(newTodoListState[0].title).toBe('First_todo');
        expect(newTodoListState[0].filter).toBe(FilterType.ALL);
        expect(newTodoListState[0].entityStatus).toBe(EntityStatus.IDLE);
    });
});
