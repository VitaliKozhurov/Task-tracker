import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { todoListsActions, todoListsThunks } from 'features/todolists/todolists-list/model/todo-lists-slice';
import { TasksApi, TaskServerType, UpdateTaskModelType } from 'features/todolists/tasks-list/api/tasks-api';
import { createAppAsyncThunk } from 'common/utils';
import { EntityStatus, EntityStatusType } from 'app/model/app-slice';
import { ResultCode } from 'common/api/api';

const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksType,
    reducers: {
        changeTaskActiveStatus: (state, action: ChangeTaskActiveStatusType) => {
            state[action.payload.todoListID] = state[action.payload.todoListID].map((task) =>
                task.id === action.payload.taskID ? { ...task, isActive: true } : { ...task, isActive: false },
            );
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
                    isActive: false,
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
                    isActive: false,
                }));
            })
            .addCase(tasksThunks.updateTask.fulfilled, (state, action) => {
                let tasksForCurrentTodoList = state[action.payload.todoListID];
                const index = tasksForCurrentTodoList.findIndex((task) => task.id === action.payload.taskID);
                if (index !== -1) {
                    tasksForCurrentTodoList[index] = {
                        ...tasksForCurrentTodoList[index],
                        ...action.payload.updateModel,
                        entityStatus: EntityStatus.IDLE,
                    };
                }
            })
            .addCase(todoListsActions.changeTodoListActiveStatus, (state) => {
                for (let key in state) {
                    state[key] = state[key].map((task) => ({ ...task, isActive: false }));
                }
            })
            .addMatcher(
                (action) => {
                    return action.type.endsWith('deleteTask/pending');
                },
                (state, action) => {
                    const { todoListID, taskID } = action.meta.arg;
                    const index = state[todoListID].findIndex((task) => task.id === taskID);
                    if (index !== -1) {
                        state[todoListID][index].entityStatus = EntityStatus.LOADING;
                    }
                },
            )
            .addMatcher(
                (action) => {
                    return action.type.endsWith('deleteTask/rejected');
                },
                (state, action) => {
                    const { todoListID, taskID } = action.meta.arg;
                    const index = state[todoListID].findIndex((task) => task.id === taskID);
                    if (index !== -1) {
                        state[todoListID][index].entityStatus = EntityStatus.IDLE;
                    }
                },
            )
            .addMatcher(
                (action) => {
                    return action.type.endsWith('updateTask/pending');
                },
                (state, action) => {
                    console.log(action);
                    const { todoListID, taskID } = action.meta.arg;
                    const index = state[todoListID].findIndex((task) => task.id === taskID);
                    if (index !== -1) {
                        state[todoListID][index].entityStatus = EntityStatus.LOADING;
                    }
                },
            )
            .addMatcher(
                (action) => {
                    return action.type.endsWith('updateTask/rejected');
                },
                (state, action) => {
                    const { todoListID, taskID } = action.meta.arg;
                    const index = state[todoListID].findIndex((task) => task.id === taskID);
                    if (index !== -1) {
                        state[todoListID][index].entityStatus = EntityStatus.IDLE;
                    }
                },
            )
            .addMatcher(
                (action) => {
                    return action.type.endsWith('logout/fulfilled');
                },
                (state, action) => {
                    return {};
                },
            );
    },
});

export const getTasks = createAppAsyncThunk<{ tasks: TaskServerType[]; todoListID: string }, { todoListID: string }>(
    'tasks/getTasks',
    async (arg, { rejectWithValue }) => {
        const result = await TasksApi.getTasks(arg.todoListID);
        if (!result.data.error) {
            return { tasks: result.data.items, todoListID: arg.todoListID };
        } else {
            return rejectWithValue(null);
        }
    },
);
export const createTask = createAppAsyncThunk<{ task: TaskServerType }, CreateTaskArgType>(
    'tasks/createTask',
    async (arg, { rejectWithValue }) => {
        const result = await TasksApi.createTask(arg.todoListID, arg.title);
        if (result.data.resultCode === ResultCode.SUCCESS) {
            return { task: result.data.data.item };
        } else {
            return rejectWithValue({ data: result.data, showGlobalError: false });
        }
    },
);
export const deleteTask = createAppAsyncThunk<DeleteTaskArgType, DeleteTaskArgType>(
    'tasks/deleteTask',
    async (arg, { rejectWithValue }) => {
        const result = await TasksApi.deleteTask(arg.todoListID, arg.taskID);
        if (result.data.resultCode === ResultCode.SUCCESS) {
            return arg;
        } else {
            return rejectWithValue({ data: result.data, showGlobalError: true });
        }
    },
);
export const updateTask = createAppAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>(
    'tasks/updateTask',
    async (arg, { rejectWithValue, getState }) => {
        const state = getState();
        const task = state.tasks[arg.todoListID].find((task) => task.id === arg.taskID);
        if (!task) {
            return rejectWithValue(null);
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
        const result = await TasksApi.updateTask(arg.todoListID, arg.taskID, updatedTask);
        if (result.data.resultCode === ResultCode.SUCCESS) {
            return arg;
        } else {
            return rejectWithValue({ data: result.data, showGlobalError: true });
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
export type UpdateModelType = Partial<UpdateTaskModelType>;
export type TaskType = TaskServerType & { entityStatus: EntityStatusType; isActive: boolean };
type ChangeTaskActiveStatusType = PayloadAction<{ todoListID: string; taskID: string }>;
type UpdateTaskArgType = { todoListID: string; taskID: string; updateModel: UpdateModelType };
type CreateTaskArgType = { todoListID: string; title: { title: string } };
type DeleteTaskArgType = { todoListID: string; taskID: string };
