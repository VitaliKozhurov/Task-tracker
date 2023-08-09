import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { appActions, EntityStatus, EntityStatusType } from 'app/appSlice';
import { TodoListsApi, TodoListServerType } from 'features/todolists/todolists-list/api/todo-lists-api';
import { createAppAsyncThunk, handleServerAppError, thunkTryCatch } from 'common/utils';
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
        changeTodoListEntityStatus: (state, action: ChangeTodoListEntityStatusType) => {
            const index = state.findIndex((todo) => todo.id === action.payload.todoListID);
            if (index !== -1) {
                state[index].entityStatus = action.payload.entityStatus;
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
                }
            });
    },
});

export const getTodoLists = createAppAsyncThunk<{ todoLists: TodoListServerType[] }>(
    'todoLists1/getTodoLists',
    (_, thunkAPI) => {
        const { dispatch } = thunkAPI;
        return thunkTryCatch(thunkAPI, async () => {
            const result = await TodoListsApi.getTodoLists();
            result.data.forEach((todo) => dispatch(tasksThunks.getTasks({ todoListID: todo.id })));
            return { todoLists: result.data };
        });
    },
);
export const createTodoList = createAppAsyncThunk<{ todoList: TodoListServerType }, { title: string }>(
    'todoLists1/createTodoList',
    (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        return thunkTryCatch(thunkAPI, async () => {
            const result = await TodoListsApi.createTodoList(arg);
            if (result.data.resultCode === ResultCode.SUCCESS) {
                return { todoList: result.data.data.item };
            } else {
                handleServerAppError(result.data, dispatch);
                return rejectWithValue(null);
            }
        });
    },
);

export const deleteTodoList = createAppAsyncThunk<DeleteTodoListType, DeleteTodoListType>(
    'todoLists1/deleteTodoList',
    (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        return thunkTryCatch(thunkAPI, async () => {
            dispatch(
                todoListsActions.changeTodoListEntityStatus({
                    todoListID: arg.todoListID,
                    entityStatus: EntityStatus.LOADING,
                }),
            );
            const result = await TodoListsApi.deleteTodoList(arg.todoListID);
            if (result.data.resultCode === ResultCode.SUCCESS) {
                dispatch(appActions.setAppStatus({ status: EntityStatus.SUCCEEDED }));
                return arg;
            } else {
                handleServerAppError(result.data, dispatch);
                dispatch(
                    todoListsActions.changeTodoListEntityStatus({
                        todoListID: arg.todoListID,
                        entityStatus: EntityStatus.FAILED,
                    }),
                );
                return rejectWithValue(null);
            }
        }).finally(() => {
            dispatch(
                todoListsActions.changeTodoListEntityStatus({
                    todoListID: arg.todoListID,
                    entityStatus: EntityStatus.IDLE,
                }),
            );
        });
    },
);

export const updateTodoListTitle = createAppAsyncThunk<updateTodoListTitleType, updateTodoListTitleType>(
    'todoLists1/changeTodoListTitle',
    (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        return thunkTryCatch(thunkAPI, async () => {
            dispatch(
                todoListsActions.changeTodoListEntityStatus({
                    todoListID: arg.todoListID,
                    entityStatus: EntityStatus.LOADING,
                }),
            );
            const result = await TodoListsApi.updateTodoListTitle(arg.todoListID, arg.title);
            if (result.data.resultCode === ResultCode.SUCCESS) {
                return arg;
            } else {
                handleServerAppError(result.data, dispatch);
                return rejectWithValue(null);
            }
        }).finally(() => {
            dispatch(
                todoListsActions.changeTodoListEntityStatus({
                    todoListID: arg.todoListID,
                    entityStatus: EntityStatus.IDLE,
                }),
            );
        });
    },
);

export const todoListsReducer = slice.reducer;
export const todoListsActions = slice.actions;
export const todoListsThunks = { getTodoLists, createTodoList, deleteTodoList, updateTodoListTitle };

// types
type FilterValueType = (typeof FilterType)[keyof typeof FilterType];
export type TodoListsInitialStateType = ReturnType<typeof slice.getInitialState>;
export type TodoListType = TodoListServerType & { filter: FilterValueType } & { entityStatus: EntityStatusType } & {
    isActive: boolean;
};
type ChangeTodoListFilterType = PayloadAction<{ todoListID: string; filter: FilterValueType }>;
type ChangeTodoListEntityStatusType = PayloadAction<{ todoListID: string; entityStatus: EntityStatusType }>;
type ChangeTodoListActiveStatusType = PayloadAction<{ todoListID: string; activeStatus: boolean }>;
type ChangeTodoListOrderType = PayloadAction<{ dragTodo: TodoListType; dropTodo: TodoListType }>;
type DeleteTodoListType = { todoListID: string };
type updateTodoListTitleType = { todoListID: string; title: { title: string } };
