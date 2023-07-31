import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { todoListsThunks } from 'features/todoLists/todoListSlice';
import { TasksAPI, TaskServerType, UpdateTaskModelType } from 'features/todoLists/tasks/tasksApi';
import { createAppAsyncThunk, handleNetworkAppError, handleServerAppError } from 'common/utils';
import { appActions, EntityStatus, EntityStatusType } from 'app/appSlice';
import { ResultCode } from 'common/api/api';

const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksType,
    reducers: {
        changeTaskEntityStatus: (state, action: ChangeTaskEntityStatusType) => {
            const tasks = state[action.payload.todoListID];
            const index = tasks.findIndex((task) => task.id === action.payload.taskID);
            if (index !== -1) {
                tasks[index].entityStatus = action.payload.entityStatus;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(todoListsThunks.createTodoList.fulfilled, (state, action) => {
                state[action.payload.todoList.id] = [];
            })
            .addCase(todoListsThunks.deleteTodoList.fulfilled, (state, action) => {
                delete state[action.payload.todoListID];
            })
            .addCase(todoListsThunks.getTodoLists.fulfilled, (state, action) => {
                action.payload.todoLists.forEach((todoList) => {
                    state[todoList.id] = [];
                });
            })
            .addCase(tasksThunks.createTask.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift({
                    ...action.payload.task,
                    entityStatus: EntityStatus.IDLE,
                });
            })
            .addCase(tasksThunks.deleteTask.fulfilled, (state, action) => {
                let tasksForCurrentTodoList = state[action.payload.todoListID];
                const index = tasksForCurrentTodoList.findIndex((task) => task.id === action.payload.taskID);
                if (index !== -1) {
                    tasksForCurrentTodoList.splice(index, 1);
                }
            })
            .addCase(tasksThunks.getTasks.fulfilled, (state, action) => {
                state[action.payload.todoListID] = action.payload.tasks.map((task) => ({
                    ...task,
                    entityStatus: EntityStatus.IDLE,
                }));
            })
            .addCase(tasksThunks.updateTask.fulfilled, (state, action) => {
                let tasksForCurrentTodoList = state[action.payload.todoListID];
                const index = tasksForCurrentTodoList.findIndex((task) => task.id === action.payload.taskID);
                if (index !== -1) {
                    tasksForCurrentTodoList[index] = {
                        ...tasksForCurrentTodoList[index],
                        ...action.payload.updateModel,
                    };
                }
            });
    },
});

export const getTasks = createAppAsyncThunk<{ tasks: TaskServerType[]; todoListID: string }, { todoListID: string }>(
    'tasks/getTasks',
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        try {
            dispatch(appActions.setAppStatus({ status: EntityStatus.LOADING }));
            const result = await TasksAPI.getTasks(arg.todoListID);
            if (!result.data.error) {
                dispatch(appActions.setAppStatus({ status: EntityStatus.SUCCEEDED }));
                return { tasks: result.data.items, todoListID: arg.todoListID };
            } else {
                dispatch(appActions.setAppStatus({ status: EntityStatus.FAILED }));
                dispatch(appActions.setAppError({ error: result.data.error }));
                return rejectWithValue(null);
            }
        } catch (e) {
            handleNetworkAppError(e, dispatch);
            return rejectWithValue(null);
        }
    },
);
export const createTask = createAppAsyncThunk<{ task: TaskServerType }, CreateTaskArgType>(
    'tasks/createTask',
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        try {
            dispatch(appActions.setAppStatus({ status: EntityStatus.LOADING }));
            const result = await TasksAPI.createTask(arg.todoListID, arg.title);
            dispatch(appActions.setAppStatus({ status: EntityStatus.SUCCEEDED }));
            if (result.data.resultCode === ResultCode.SUCCESS) {
                return { task: result.data.data.item };
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

export const deleteTask = createAppAsyncThunk<DeleteTaskArgType, DeleteTaskArgType>(
    'tasks/deleteTask',
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        try {
            dispatch(
                tasksActions.changeTaskEntityStatus({
                    todoListID: arg.todoListID,
                    taskID: arg.taskID,
                    entityStatus: EntityStatus.LOADING,
                }),
            );
            const result = await TasksAPI.deleteTask(arg.todoListID, arg.taskID);
            if (result.data.resultCode === ResultCode.SUCCESS) {
                return arg;
            } else {
                handleServerAppError(result.data, dispatch);
                dispatch(
                    tasksActions.changeTaskEntityStatus({
                        todoListID: arg.todoListID,
                        taskID: arg.taskID,
                        entityStatus: EntityStatus.FAILED,
                    }),
                );
                return rejectWithValue(null);
            }
        } catch (e) {
            handleNetworkAppError(e, dispatch);
            dispatch(
                tasksActions.changeTaskEntityStatus({
                    todoListID: arg.todoListID,
                    taskID: arg.taskID,
                    entityStatus: EntityStatus.FAILED,
                }),
            );
            return rejectWithValue(null);
        }
    },
);

export const updateTask = createAppAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>(
    'tasks/updateTask',
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue, getState } = thunkAPI;
        try {
            dispatch(appActions.setAppStatus({ status: EntityStatus.LOADING }));
            dispatch(
                tasksActions.changeTaskEntityStatus({
                    todoListID: arg.todoListID,
                    taskID: arg.taskID,
                    entityStatus: EntityStatus.LOADING,
                }),
            );
            const state = getState();
            const task = state.tasks[arg.todoListID].find((task) => task.id === arg.taskID);
            if (!task) {
                throw Error('Task not found');
            }
            const updatedTask = {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                ...arg.updateModel,
            };
            const result = await TasksAPI.updateTask(arg.todoListID, arg.taskID, updatedTask);
            if (result.data.resultCode === ResultCode.SUCCESS) {
                dispatch(appActions.setAppStatus({ status: EntityStatus.SUCCEEDED }));
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
                tasksActions.changeTaskEntityStatus({
                    todoListID: arg.todoListID,
                    taskID: arg.taskID,
                    entityStatus: EntityStatus.IDLE,
                }),
            );
        }
    },
);
export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;
export const tasksThunks = { getTasks, createTask, deleteTask, updateTask };
// types
export type TasksInitialStateType = ReturnType<typeof slice.getInitialState>;
type TasksType = {
    [key: string]: TaskType[];
};
type UpdateModelType = Partial<UpdateTaskModelType>;
type TaskType = TaskServerType & { entityStatus: EntityStatusType };
type ChangeTaskEntityStatusType = PayloadAction<{ todoListID: string; taskID: string; entityStatus: EntityStatusType }>;
type UpdateTaskArgType = { todoListID: string; taskID: string; updateModel: UpdateModelType };
type CreateTaskArgType = { todoListID: string; title: { title: string } };
type DeleteTaskArgType = { todoListID: string; taskID: string };
