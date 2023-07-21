import { appActions, AppInitialStateType, appReducer, RequestStatusType } from 'app/appSlice';

describe('App reducer tests', () => {
    let appState: AppInitialStateType;

    beforeEach(() => {
        appState = {
            status: RequestStatusType.IDLE,
            error: null,
            isInitialized: false,
        };
    });

    it('Should change app status from IDLE to LOADING', () => {
        const newAppState = appReducer(appState, appActions.setAppStatus({ status: RequestStatusType.LOADING }));
        expect(newAppState.status).toBe(RequestStatusType.LOADING);
    });

    it('Should change app status from IDLE to FAILED', () => {
        const newAppState = appReducer(appState, appActions.setAppStatus({ status: RequestStatusType.FAILED }));
        expect(newAppState.status).toBe(RequestStatusType.FAILED);
    });

    it('Should change app error status', () => {
        const newAppState = appReducer(appState, appActions.setAppError({ error: 'Something went wrong' }));
        expect(newAppState.error).toBe('Something went wrong');
    });

    it('Should change app initialized status from false to true', () => {
        const newAppState = appReducer(appState, appActions.setAppInitialized({ isInitialized: true }));
        expect(newAppState.isInitialized).toBe(true);
    });
});
