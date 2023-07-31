import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { appActions, EntityStatus, EntityStatusType } from 'app/appSlice';
import { TodoListsApi, TodoListServerType } from 'features/todoLists/todoListsApi';
import { createAppAsyncThunk, handleNetworkAppError, handleServerAppError } from 'common/utils';
import { ResultCode } from 'common/api/api';

export const FilterType = {
    ALL: 'all',
    ACTIVE: 'active',
    COMPLETED: 'completed',
} as const;

const slice = createSlice({
    name: 'todoList',
    initialState: [] as TodoListsType[],
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
            // const index = state.findIndex((todo) => todo.id === action.payload.todoListID);
            // if (index !== -1) {
            //     state[index].isActive = action.payload.activeStatus;
            // }
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
    'todoLists/getTodoLists',
    async (_, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        try {
            dispatch(appActions.setAppStatus({ status: EntityStatus.LOADING }));
            const result = await TodoListsApi.getTodoLists();
            dispatch(appActions.setAppStatus({ status: EntityStatus.SUCCEEDED }));
            return { todoLists: result.data };
        } catch (e) {
            handleNetworkAppError(e, dispatch);
            return rejectWithValue(null);
        }
    },
);
export const createTodoList = createAppAsyncThunk<{ todoList: TodoListServerType }, { title: string }>(
    'todoLists/createTodoList',
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        try {
            dispatch(appActions.setAppStatus({ status: EntityStatus.LOADING }));
            const result = await TodoListsApi.createTodoList(arg);
            if (result.data.resultCode === ResultCode.SUCCESS) {
                dispatch(appActions.setAppStatus({ status: EntityStatus.SUCCEEDED }));
                return { todoList: result.data.data.item };
            } else {
                handleServerAppError(result.data, dispatch);
                return rejectWithValue(null);
            }
        } catch (e) {
            handleNetworkAppError(e, dispatch);
            return rejectWithValue(null);
        }
    },
);
export const deleteTodoList = createAppAsyncThunk<{ todoListID: string }, { todoListID: string }>(
    'todoLists/deleteTodoList',
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        try {
            dispatch(appActions.setAppStatus({ status: EntityStatus.LOADING }));
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
        } catch (e) {
            handleNetworkAppError(e, dispatch);
            dispatch(
                todoListsActions.changeTodoListEntityStatus({
                    todoListID: arg.todoListID,
                    entityStatus: EntityStatus.FAILED,
                }),
            );
            return rejectWithValue(null);
        }
    },
);
export const updateTodoListTitle = createAppAsyncThunk<
    { todoListID: string; title: { title: string } },
    { todoListID: string; title: { title: string } }
>('todoLists/changeTodoListTitle', async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
        dispatch(appActions.setAppStatus({ status: EntityStatus.LOADING }));
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
    } catch (e) {
        handleNetworkAppError(e, dispatch);
        return rejectWithValue(null);
    } finally {
        dispatch(
            todoListsActions.changeTodoListEntityStatus({
                todoListID: arg.todoListID,
                entityStatus: EntityStatus.IDLE,
            }),
        );
    }
});

export const todoListsReducer = slice.reducer;
export const todoListsActions = slice.actions;
export const todoListsThunks = { getTodoLists, createTodoList, deleteTodoList, updateTodoListTitle };

// types
type FilterValueType = (typeof FilterType)[keyof typeof FilterType];
export type TodoListsInitialStateType = ReturnType<typeof slice.getInitialState>;
export type TodoListsType = TodoListServerType & { filter: FilterValueType } & { entityStatus: EntityStatusType } & {
    isActive: boolean;
};
type ChangeTodoListFilterType = PayloadAction<{ todoListID: string; filter: FilterValueType }>;
type ChangeTodoListEntityStatusType = PayloadAction<{ todoListID: string; entityStatus: EntityStatusType }>;
type ChangeTodoListActiveStatusType = PayloadAction<{ todoListID: string; activeStatus: boolean }>;
