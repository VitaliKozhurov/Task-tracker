import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EntityStatus, EntityStatusType } from 'app/model/app-slice';
import { TodoListsApi, TodoListServerType } from 'features/todolists/todolists-list/api/todo-lists-api';
import { createAppAsyncThunk } from 'common/utils';
import { ResultCode } from 'common/api/api';
import { tasksThunks } from 'features/todolists/tasks-list/model/task-slice';

export const FilterType = {
    ALL: 'all',
    ACTIVE: 'active',
    COMPLETED: 'completed',
} as const;

const slice = createSlice({
    name: 'todoList',
    initialState: [] as TodoListType[],
    reducers: {
        changeTodoListFilter: (state, action: ChangeTodoListFilterType) => {
            const index = state.findIndex((todo) => todo.id === action.payload.todoListID);
            if (index !== -1) {
                state[index].filter = action.payload.filter;
            }
        },
        changeTodoListActiveStatus: (state, action: ChangeTodoListActiveStatusType) => {
            return state.map((todo) =>
                todo.id === action.payload.todoListID ? { ...todo, isActive: true } : { ...todo, isActive: false },
            );
        },
        changeTodoListOrder: (state, action: ChangeTodoListOrderType) => {
            return state.map((todo) => {
                if (todo.id === action.payload.dropTodo.id) {
                    return { ...todo, order: action.payload.dragTodo.order };
                }
                if (todo.id === action.payload.dragTodo.id) {
                    return { ...todo, order: action.payload.dropTodo.order };
                }
                return todo;
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTodoLists.fulfilled, (state, action) => {
                return action.payload.todoLists.map((todo) => ({
                    ...todo,
                    filter: FilterType.ALL,
                    entityStatus: EntityStatus.IDLE,
                    isActive: false,
                }));
            })
            .addCase(createTodoList.fulfilled, (state, action) => {
                state.unshift({
                    ...action.payload.todoList,
                    filter: FilterType.ALL,
                    entityStatus: EntityStatus.IDLE,
                    isActive: false,
                });
            })
            .addCase(deleteTodoList.fulfilled, (state, action) => {
                const index = state.findIndex((todo) => todo.id === action.payload.todoListID);
                if (index !== -1) {
                    state.splice(index, 1);
                }
            })
            .addCase(updateTodoListTitle.fulfilled, (state, action) => {
                const index = state.findIndex((todo) => todo.id === action.payload.todoListID);
                if (index !== -1) {
                    state[index].title = action.payload.title.title;
                    state[index].entityStatus = EntityStatus.IDLE;
                }
            })
            .addMatcher(
                (action) => {
                    return (
                        action.type.endsWith('deleteTodoList/pending') ||
                        action.type.endsWith('changeTodoListTitle/pending')
                    );
                },
                (state, action) => {
                    const todoListID = action.meta.arg.todoListID;
                    const index = state.findIndex((todo) => todo.id === todoListID);
                    if (index !== -1) {
                        state[index].entityStatus = EntityStatus.LOADING;
                    }
                },
            )
            .addMatcher(
                (action) => {
                    return (
                        action.type.endsWith('deleteTodoList/rejected') ||
                        action.type.endsWith('changeTodoListTitle/rejected')
                    );
                },
                (state, action) => {
                    const todoListID = action.meta.arg.todoListID;
                    const index = state.findIndex((todo) => todo.id === todoListID);
                    if (index !== -1) {
                        state[index].entityStatus = EntityStatus.IDLE;
                    }
                },
            );
    },
});

export const getTodoLists = createAppAsyncThunk<{ todoLists: TodoListServerType[] }>(
    'todoList/getTodoLists',
    async (_, { dispatch }) => {
        const result = await TodoListsApi.getTodoLists();
        result.data.forEach((todo) => dispatch(tasksThunks.getTasks({ todoListID: todo.id })));
        return { todoLists: result.data };
    },
);

export const createTodoList = createAppAsyncThunk<{ todoList: TodoListServerType }, { title: string }>(
    'todoList/createTodoList',
    async (arg, { rejectWithValue }) => {
        const result = await TodoListsApi.createTodoList(arg);
        if (result.data.resultCode === ResultCode.SUCCESS) {
            return { todoList: result.data.data.item };
        } else {
            return rejectWithValue({ data: result.data, showGlobalError: false });
        }
    },
);

export const deleteTodoList = createAppAsyncThunk<DeleteTodoListType, DeleteTodoListType>(
    'todoList/deleteTodoList',
    async (arg, { rejectWithValue }) => {
        const result = await TodoListsApi.deleteTodoList(arg.todoListID);
        if (result.data.resultCode === ResultCode.SUCCESS) {
            return arg;
        } else {
            return rejectWithValue({ data: result.data, showGlobalError: true });
        }
    },
);

export const updateTodoListTitle = createAppAsyncThunk<updateTodoListTitleType, updateTodoListTitleType>(
    'todoList/changeTodoListTitle',
    async (arg, { rejectWithValue }) => {
        const result = await TodoListsApi.updateTodoListTitle(arg.todoListID, arg.title);
        if (result.data.resultCode === ResultCode.SUCCESS) {
            return arg;
        } else {
            return rejectWithValue({ data: result.data, showGlobalError: true });
        }
    },
);

export const todoListsReducer = slice.reducer;
export const todoListsActions = slice.actions;
export const todoListsThunks = { getTodoLists, createTodoList, deleteTodoList, updateTodoListTitle };

// types
export type FilterValueType = (typeof FilterType)[keyof typeof FilterType];
export type TodoListsInitialStateType = ReturnType<typeof slice.getInitialState>;
export type TodoListType = TodoListServerType & { filter: FilterValueType } & { entityStatus: EntityStatusType } & {
    isActive: boolean;
};
type ChangeTodoListFilterType = PayloadAction<{ todoListID: string; filter: FilterValueType }>;
type ChangeTodoListActiveStatusType = PayloadAction<{ todoListID: string; activeStatus: boolean }>;
type ChangeTodoListOrderType = PayloadAction<{ dragTodo: TodoListType; dropTodo: TodoListType }>;
type DeleteTodoListType = { todoListID: string };
type updateTodoListTitleType = { todoListID: string; title: { title: string } };
