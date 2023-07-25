import { RootState } from 'app/store';

export const getAppStatusSelector = (state: RootState) => state.app.status;
export const getAppErrorSelector = (state: RootState) => state.app.error;
export const getAppInitializedStatusSelector = (state: RootState) => state.app.isInitialized;
