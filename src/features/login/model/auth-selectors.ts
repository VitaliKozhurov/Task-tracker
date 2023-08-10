import { RootState } from 'app/model/store';

export const getAuthLoggedStatusSelector = (state: RootState) => state.auth.isLoggedIn;
