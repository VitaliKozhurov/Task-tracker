import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { authReducer } from 'features/login/auth-slice';
import { appReducer } from 'app/app-slice';

// configure store под капотом комбайнит редьюсеры
export const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
