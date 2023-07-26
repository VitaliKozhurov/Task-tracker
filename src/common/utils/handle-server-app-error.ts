import { AppDispatch } from 'app/store';
import { ResponseType } from 'common/api/api';
import { appActions, EntityStatus } from 'app/appSlice';

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: AppDispatch) => {
    const error = data.messages[0] ? data.messages[0] : 'Server error';
    dispatch(appActions.setAppError({ error }));
    dispatch(appActions.setAppStatus({ status: EntityStatus.FAILED }));
};
