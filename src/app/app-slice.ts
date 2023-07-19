import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type StatusActionType = PayloadAction<{ status: RequestStatusType }>;
type ErrorActionType = PayloadAction<{ error: null | string }>;
type InitializedActionType = PayloadAction<{ isInitialized: boolean }>;
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
        setAppStatus: (state, action: StatusActionType) => {
            state.status = action.payload.status;
        },
        setAppError: (state, action: ErrorActionType) => {
            state.error = action.payload.error;
        },
        setAppInitialized: (state, action: InitializedActionType) => {
            state.isInitialized = action.payload.isInitialized;
        },
    },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
