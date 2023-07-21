import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { authReducer } from 'features/login/authSlice';
import { appReducer } from 'app/appSlice';
import { todoListsReducer } from 'features/todoLists/todoListSlice';
import { tasksReducer } from 'features/todoLists/tasks/taskSlice';

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
