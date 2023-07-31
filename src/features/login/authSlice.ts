import { createSlice } from '@reduxjs/toolkit';
import { createAppAsyncThunk, handleNetworkAppError, handleServerAppError } from 'common/utils';
import { appActions, EntityStatus } from 'app/appSlice';
import { AuthAPI, LoginRequestType } from 'features/login/authApi';
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

export const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginRequestType, { rejectValue: string | null }>(
    'auth/login',
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        try {
            dispatch(appActions.setAppStatus({ status: EntityStatus.LOADING }));
            const result = await AuthAPI.login(arg);
            if (result.data.resultCode === ResultCode.SUCCESS) {
                // dispatch(appActions.setAppStatus({ status: EntityStatus.SUCCEEDED }));
                dispatch(appActions.setAppError({ error: null }));
                return { isLoggedIn: true };
            } else {
                //handleServerAppError(result.data, dispatch);
                return rejectWithValue(result.data.messages[0]);
            }
        } catch (e) {
            handleNetworkAppError(e, dispatch);
            return rejectWithValue(null);
        } finally {
            dispatch(appActions.setAppStatus({ status: EntityStatus.IDLE }));
        }
    },
);

export const logout = createAppAsyncThunk<{ isLoggedIn: boolean }>('auth/logout', async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
        dispatch(appActions.setAppStatus({ status: EntityStatus.LOADING }));
        const result = await AuthAPI.logout();
        if (result.data.resultCode === ResultCode.SUCCESS) {
            dispatch(appActions.setAppStatus({ status: EntityStatus.SUCCEEDED }));
            return { isLoggedIn: false };
        } else {
            handleServerAppError(result.data, dispatch);
            return rejectWithValue(null);
        }
    } catch (e) {
        handleNetworkAppError(e, dispatch);
        return rejectWithValue(null);
    }
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = { login, logout };
export type AuthInitialStateType = ReturnType<typeof slice.getInitialState>;
