import { AuthInitialStateType, authReducer, login, logout } from 'features/login/model/auth-slice';

describe('Auth reducer tests', () => {
    it('Should change logged status on true', () => {
        let authState: AuthInitialStateType = {
            isLoggedIn: false,
        };
        const action = { type: login.fulfilled.type, payload: { isLoggedIn: true } };
        const newAuthState = authReducer(authState, action);
        expect(newAuthState.isLoggedIn).toBe(true);
    });

    it('Should change logged status on false', () => {
        let authState: AuthInitialStateType = {
            isLoggedIn: true,
        };
        const action = { type: logout.fulfilled.type, payload: { isLoggedIn: false } };
        const newAuthState = authReducer(authState, action);
        expect(newAuthState.isLoggedIn).toBe(false);
    });
});
