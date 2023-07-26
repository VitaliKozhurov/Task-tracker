import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { todoListsActions } from 'features/todoLists/todoListSlice';
import { TaskType, UpdateTaskModelType } from 'features/todoLists/tasks/tasksApi';

const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksType,
    reducers: {
        addTask: (state, action: AddTaskActionType) => {
            state[action.payload.task.todoListId].unshift(action.payload.task);
        },
        removeTask: (state, action: RemoveTaskActionType) => {
            let tasksForCurrentTodoList = state[action.payload.todoListID];
            const index = tasksForCurrentTodoList.findIndex((task) => task.id === action.payload.taskID);
            if (index !== -1) {
                tasksForCurrentTodoList.splice(index, 1);
            }
        },
        setTasks: (state, action: SetTasksActionType) => {
            state[action.payload.todoListID] = action.payload.tasks;
        },
        updateTask: (state, action: UpdateTaskActionType) => {
            let tasksForCurrentTodoList = state[action.payload.todoListID];
            const index = tasksForCurrentTodoList.findIndex((task) => task.id === action.payload.taskID);
            if (index !== -1) {
                tasksForCurrentTodoList[index] = { ...tasksForCurrentTodoList[index], ...action.payload.updateModel };
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(todoListsActions.addTodoList, (state, action) => {
            state[action.payload.todoList.id] = [];
        });
        builder.addCase(todoListsActions.removeTodoList, (state, action) => {
            delete state[action.payload.todoListID];
        });
        builder.addCase(todoListsActions.setTodoLists, (state, action) => {
            action.payload.todoLists.forEach((todoList) => {
                state[todoList.id] = [];
            });
        });
    },
});

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;

// types
export type TasksInitialStateType = ReturnType<typeof slice.getInitialState>;
type TasksType = {
    [key: string]: TaskType[];
};
type UpdateModelType = Partial<UpdateTaskModelType>;
type AddTaskActionType = PayloadAction<{ task: TaskType }>;
type RemoveTaskActionType = PayloadAction<{ todoListID: string; taskID: string }>;
type SetTasksActionType = PayloadAction<{ todoListID: string; tasks: TaskType[] }>;
type UpdateTaskActionType = PayloadAction<{ todoListID: string; taskID: string; updateModel: UpdateModelType }>;
