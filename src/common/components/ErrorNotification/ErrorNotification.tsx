import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { getAppErrorSelector } from 'app/model/app-selectors';
import s from 'common/components/ErrorNotification/ErrorNotification.module.scss';
import { SlClose } from 'react-icons/sl';
import { appActions } from 'app/model/app-slice';

export const ErrorNotification = () => {
    const error = useAppSelector(getAppErrorSelector);
    const dispatch = useAppDispatch();
    const [timerId, setTimerId] = useState<number | undefined>(undefined);
    useEffect(() => {
        if (!error) return;
        const timer = window.setTimeout(() => {
            dispatch(appActions.setAppError({ error: null }));
        }, 5000);
        setTimerId(timer);

        return () => clearTimeout(timerId);
    }, [error]);

    const onCloseNotificationHandler = () => {
        clearTimeout(timerId);
        dispatch(appActions.setAppError({ error: null }));
    };
    if (!error) return null;
    return (
        <>
            <div className={s.errorBody}>
                <p>{error}</p>
                <SlClose onClick={onCloseNotificationHandler} />
            </div>
        </>
    );
};
