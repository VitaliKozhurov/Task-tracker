import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { createAppAsyncThunk, thunkTryCatch } from 'common/utils';
import { AuthApi } from 'features/login/api/auth-api';
import { ResultCode } from 'common/api/api';
import { authThunks } from 'features/login/model/auth-slice';

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
    extraReducers: (builder) => {
        builder
            .addMatcher(
                (action) => {
                    return action.type.endsWith('/pending');
                },
                (state, action) => {
                    state.status = EntityStatus.LOADING;
                },
            )
            .addMatcher(
                (action) => {
                    return action.type.endsWith('/fulfilled');
                },
                (state, action) => {
                    state.status = EntityStatus.IDLE;
                },
            )
            .addMatcher(
                (action) => {
                    return action.type.endsWith('/rejected');
                },
                // !!! Тиризация для action
                (state, action) => {
                    console.log(action);
                    if (action.payload) {
                        // Сюда попадают ошибки, которые мы возвращаем в rejectWithValue
                        if (action.payload.showGlobalError) {
                            state.error = action.payload.data.messages.length
                                ? action.payload.data.messages[0]
                                : 'Some error occurred';
                        }
                    } else {
                        // Сюда попадают ошибки при выполнени кода, не связаны с запросами на сервер
                        state.error = action.error.message ? action.error.message : 'Some error occurred';
                    }
                },
            );
    },
});

const authMe = createAppAsyncThunk<void, void>('app/authMe', (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
        const result = await AuthApi.authMe();
        if (result.data.resultCode === ResultCode.SUCCESS) {
            // Вопрос как можно по другому диспатчить эту санку !!!!!
            dispatch({ type: authThunks.login.fulfilled.type, payload: { isLoggedIn: true } });
        } else {
            return rejectWithValue(null);
        }
    }).finally(() => dispatch(appActions.setAppInitialized({ isInitialized: true })));
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
export const appThunks = { authMe };
export type EntityStatusType = (typeof EntityStatus)[keyof typeof EntityStatus];
export type AppInitialStateType = ReturnType<typeof slice.getInitialState>;
type AppStatusActionType = PayloadAction<{ status: EntityStatusType }>;
type AppErrorActionType = PayloadAction<{ error: null | string }>;
type AppInitializedActionType = PayloadAction<{ isInitialized: boolean }>;
