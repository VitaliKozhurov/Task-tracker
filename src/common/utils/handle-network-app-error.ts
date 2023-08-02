import { AppDispatch } from 'app/store';
import axios, { AxiosError } from 'axios';
import { appActions } from 'app/appSlice';

export const handleNetworkAppError = (e: unknown, dispatch: AppDispatch) => {
    const err = e as Error | AxiosError<{ error: string }>;
    if (axios.isAxiosError(err)) {
        const error = err.message ? err.message : 'Some error occurred';
        dispatch(appActions.setAppError({ error }));
    } else {
        dispatch(appActions.setAppError({ error: `Native error ${err.message}` }));
    }
};
