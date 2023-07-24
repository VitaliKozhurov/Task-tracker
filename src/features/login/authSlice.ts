import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import { AuthAPI, LoginRequestType } from 'api/api';

const slice = createSlice({
    name: 'auth',
    initialState: { isLoggedIn: false },
    reducers: {
        setIsLoggedIn: (state, action: AuthActionType) => {
            state.isLoggedIn = action.payload.isLoggedIn;
        },
    },
});
export const authReducer = slice.reducer;
export const authActions = slice.actions;

export const loginTC =
    (data: LoginRequestType): AppThunk =>
    async (dispatch) => {
        try {
            const response = await AuthAPI.login(data);
            if (response.data.resultCode === 0) {
                dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
            } else {
                alert(response.data.messages[0]);
            }
        } catch (e) {
            alert((e as { message: string }).message);
        }
    };

export type AuthInitialStateType = ReturnType<typeof slice.getInitialState>;
type AuthActionType = PayloadAction<{ isLoggedIn: boolean }>;
