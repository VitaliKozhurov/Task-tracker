import { createSlice } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from 'common/utils';
import { AuthApi, LoginRequestType } from 'features/login/api/auth-api';
import { ResultCode } from 'common/api/api';

const slice = createSlice({
    name: 'auth',
    initialState: { isLoggedIn: false, captchaUrl: '' },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
                state.captchaUrl = '';
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
            })
            .addCase(getCaptcha.fulfilled, (state, action) => {
                state.captchaUrl = action.payload.captchaUrl;
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
    async (arg, { rejectWithValue, dispatch }) => {
        const result = await AuthApi.login(arg);
        if (result.data.resultCode === ResultCode.SUCCESS) {
            return { isLoggedIn: true };
        } else if (result.data.resultCode === ResultCode.CAPTCHA) {
            dispatch(getCaptcha());
            return rejectWithValue({ data: result.data, showGlobalError: false });
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

export const getCaptcha = createAppAsyncThunk<{ captchaUrl: string }, void>(
    'auth/captcha',
    async (_, { rejectWithValue }) => {
        const result = await AuthApi.getCaptcha();
        if (result.data.url) {
            return { captchaUrl: result.data.url };
        } else {
            return rejectWithValue(null);
        }
    },
);

export const authReducer = slice.reducer;
export const authThunks = { login, logout };
export type AuthInitialStateType = ReturnType<typeof slice.getInitialState>;
