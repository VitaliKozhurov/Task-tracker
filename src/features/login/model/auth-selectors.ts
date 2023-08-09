import { RootState } from 'app/store';

export const getAuthLoggedStatusSelector = (state: RootState) => state.auth.isLoggedIn;
