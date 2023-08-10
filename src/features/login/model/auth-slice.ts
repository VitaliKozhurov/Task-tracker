import { createSlice } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from 'common/utils';
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
            })
            .addMatcher(
                (action) => {
                    return action.type.endsWith('authMe/fulfilled');
                },
                (state) => {
                    state.isLoggedIn = true;
                },
            );
    },
});

export const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginRequestType>(
    'auth/login',
    async (arg, { rejectWithValue }) => {
        const result = await AuthApi.login(arg);
        if (result.data.resultCode === ResultCode.SUCCESS) {
            return { isLoggedIn: true };
        } else {
            const showGlobalError = !result.data.fieldsErrors.length;
            return rejectWithValue({ data: result.data, showGlobalError });
        }
    },
);

export const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        const result = await AuthApi.logout();
        if (result.data.resultCode === ResultCode.SUCCESS) {
            return { isLoggedIn: false };
        } else {
            return rejectWithValue({ data: result.data, showGlobalError: true });
        }
    },
);

export const authReducer = slice.reducer;
export const authThunks = { login, logout };
export type AuthInitialStateType = ReturnType<typeof slice.getInitialState>;
