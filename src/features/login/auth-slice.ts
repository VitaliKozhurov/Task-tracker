import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthActionType = PayloadAction<{ isLoggedIn: boolean }>;

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
