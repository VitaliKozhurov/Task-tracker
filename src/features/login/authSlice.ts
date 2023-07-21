import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export type AuthInitialStateType = ReturnType<typeof slice.getInitialState>;
type AuthActionType = PayloadAction<{ isLoggedIn: boolean }>;
