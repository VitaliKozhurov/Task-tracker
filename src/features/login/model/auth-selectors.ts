import { RootState } from 'app/model/store';

export const getAuthLoggedStatusSelector = (state: RootState) => state.auth.isLoggedIn;
export const getCaptchaSelector = (state: RootState) => state.auth.captchaUrl;
