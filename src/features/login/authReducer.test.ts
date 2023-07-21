import { authActions, AuthInitialStateType, authReducer } from 'features/login/authSlice';

describe('Auth reducer tests', () => {
    let authState: AuthInitialStateType;
    beforeEach(() => {
        authState = {
            isLoggedIn: false,
        };
    });

    it('Should change logged status', () => {
        const newAuthState = authReducer(authState, authActions.setIsLoggedIn({ isLoggedIn: true }));
        expect(newAuthState.isLoggedIn).toBe(true);
    });
});
