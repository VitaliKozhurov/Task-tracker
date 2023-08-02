import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAppAsyncThunk, handleNetworkAppError, handleServerAppError } from 'common/utils';
import { AuthAPI } from 'features/login/authApi';
import { ResultCode } from 'common/api/api';
import { authThunks } from 'features/login/authSlice';

export const EntityStatus = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCEEDED: 'succeeded',
    FAILED: 'failed',
} as const;

const slice = createSlice({
    name: 'app',
    initialState: {
        status: EntityStatus.IDLE as EntityStatusType,
        error: null as null | string,
        isInitialized: false,
    },
    reducers: {
        setAppStatus: (state, action: AppStatusActionType) => {
            state.status = action.payload.status;
        },
        setAppError: (state, action: AppErrorActionType) => {
            state.error = action.payload.error;
        },
        setAppInitialized: (state, action: AppInitializedActionType) => {
            state.isInitialized = action.payload.isInitialized;
        },
    },
});

const authMe = createAppAsyncThunk<void, void>('app/authMe', async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
        const result = await AuthAPI.authMe();
        if (result.data.resultCode === ResultCode.SUCCESS) {
            // Вопрос как можно по другому диспатчить эту санку !!!!!
            dispatch({ type: authThunks.login.fulfilled.type, payload: { isLoggedIn: true } });
        } else {
            handleServerAppError(result.data, dispatch);
            return rejectWithValue(null);
        }
    } catch (e) {
        handleNetworkAppError(e, dispatch);
        return rejectWithValue(null);
    } finally {
        dispatch(appActions.setAppInitialized({ isInitialized: true }));
    }
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
export const appThunks = { authMe };
export type EntityStatusType = (typeof EntityStatus)[keyof typeof EntityStatus];
export type AppInitialStateType = ReturnType<typeof slice.getInitialState>;
type AppStatusActionType = PayloadAction<{ status: EntityStatusType }>;
type AppErrorActionType = PayloadAction<{ error: null | string }>;
type AppInitializedActionType = PayloadAction<{ isInitialized: boolean }>;
