import { appActions, AppInitialStateType, appReducer, appThunks, EntityStatus } from 'app/appSlice';

describe('App reducer tests', () => {
    let appState: AppInitialStateType;

    beforeEach(() => {
        appState = {
            status: EntityStatus.IDLE,
            error: null,
            isInitialized: false,
        };
    });

    it('Should change app status from IDLE to LOADING', () => {
        const newAppState = appReducer(appState, appActions.setAppStatus({ status: EntityStatus.LOADING }));
        expect(newAppState.status).toBe(EntityStatus.LOADING);
    });

    it('Should change app status from IDLE to FAILED', () => {
        const newAppState = appReducer(appState, appActions.setAppStatus({ status: EntityStatus.FAILED }));
        expect(newAppState.status).toBe(EntityStatus.FAILED);
    });

    it('Should change app error status', () => {
        const newAppState = appReducer(appState, appActions.setAppError({ error: 'Something went wrong' }));
        expect(newAppState.error).toBe('Something went wrong');
    });

    it('Should change app initialized status from false to true', () => {
        const action = appThunks.authMe.fulfilled({ isInitialized: true }, 'requestId');
        const newAppState = appReducer(appState, action);
        expect(newAppState.isInitialized).toBe(true);
    });
});
