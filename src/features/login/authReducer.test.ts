import { AuthInitialStateType, authReducer, login, logout } from 'features/login/authSlice';

describe('Auth reducer tests', () => {
    it('Should change logged status on true', () => {
        let authState: AuthInitialStateType = {
            isLoggedIn: false,
        };
        const action = login.fulfilled({ isLoggedIn: true }, 'requestId', {
            email: ' ',
            password: ' ',
            rememberMe: true,
        });
        const newAuthState = authReducer(authState, action);
        expect(newAuthState.isLoggedIn).toBe(true);
    });

    it('Should change logged status on false', () => {
        let authState: AuthInitialStateType = {
            isLoggedIn: true,
        };
        const action = logout.fulfilled({ isLoggedIn: false }, 'requestId');
        const newAuthState = authReducer(authState, action);
        expect(newAuthState.isLoggedIn).toBe(false);
    });
});
