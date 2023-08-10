import { createSlice } from '@reduxjs/toolkit';
import { createAppAsyncThunk, handleServerAppError, thunkTryCatch } from 'common/utils';
import { appActions, EntityStatus } from 'app/model/app-slice';
import { AuthApi, LoginRequestType } from 'features/login/api/auth-api';
import { ResultCode } from 'common/api/api';

const slice = createSlice({
    name: 'auth',
    initialState: { isLoggedIn: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
            });
    },
});

export const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginRequestType>('auth/login', (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
        const result = await AuthApi.login(arg);
        if (result.data.resultCode === ResultCode.SUCCESS) {
            dispatch(appActions.setAppStatus({ status: EntityStatus.SUCCEEDED }));
            return { isLoggedIn: true };
        } else {
            const isShowError = !result.data.fieldsErrors.length;
            handleServerAppError(result.data, dispatch, isShowError);
            return rejectWithValue(result.data);
        }
    });
});

export const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>('auth/logout', (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
        const result = await AuthApi.logout();
        if (result.data.resultCode === ResultCode.SUCCESS) {
            dispatch(appActions.setAppStatus({ status: EntityStatus.SUCCEEDED }));
            return { isLoggedIn: false };
        } else {
            handleServerAppError(result.data, dispatch);
            return rejectWithValue(null);
        }
    });
});

export const authReducer = slice.reducer;
export const authThunks = { login, logout };
export type AuthInitialStateType = ReturnType<typeof slice.getInitialState>;
