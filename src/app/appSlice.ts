import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export const appReducer = slice.reducer;
export const appActions = slice.actions;
export type EntityStatusType = (typeof EntityStatus)[keyof typeof EntityStatus];
export type AppInitialStateType = ReturnType<typeof slice.getInitialState>;
type AppStatusActionType = PayloadAction<{ status: EntityStatusType }>;
type AppErrorActionType = PayloadAction<{ error: null | string }>;
type AppInitializedActionType = PayloadAction<{ isInitialized: boolean }>;
