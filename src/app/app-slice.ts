import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppStatusActionType = PayloadAction<{ status: RequestStatusType }>;
type AppErrorActionType = PayloadAction<{ error: null | string }>;
type AppInitializedActionType = PayloadAction<{ isInitialized: boolean }>;
export enum RequestStatusType {
    IDLE = 'idle',
    LOADING = 'loading',
    SUCCEEDED = 'succeeded',
    FAILED = 'failed',
}

const slice = createSlice({
    name: 'app',
    initialState: {
        status: RequestStatusType.IDLE,
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

export const appReducer = slice.reducer;
export const appActions = slice.actions;
