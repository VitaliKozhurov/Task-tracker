import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { authReducer } from 'features/login/model/auth-slice';
import { appReducer } from 'app/appSlice';
import { todoListsReducer } from 'features/todolists/todolists-list/model/todo-lists-slice';
import { tasksReducer } from 'features/todolists/tasks-list/model/task-slice';

export const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        todoLists: todoListsReducer,
        tasks: tasksReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
