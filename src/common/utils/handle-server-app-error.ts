import { AppDispatch } from 'app/model/store';
import { ResponseType } from 'common/api/api';
import { appActions } from 'app/model/app-slice';

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: AppDispatch, showError: boolean = true) => {
    if (showError) {
        const error = data.messages[0] ? data.messages[0] : 'Server error';
        dispatch(appActions.setAppError({ error }));
    }
};
