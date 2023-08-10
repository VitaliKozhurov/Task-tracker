import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { getAuthLoggedStatusSelector } from 'features/login/model/auth-selectors';
import { Button } from 'common/components/Button/Button';
import s from 'common/components/Header/Header.module.scss';
import container from 'common/style/commonStyle.module.scss';
import { FiLogOut } from 'react-icons/fi';
import { authThunks } from 'features/login/model/auth-slice';
import moment from 'moment';
import { ProgressBar } from 'common/components/ProgressBar/ProgressBar';
import { getAppStatusSelector } from 'app/model/app-selectors';
import { EntityStatus } from 'app/model/app-slice';

export const Header = () => {
    const dispatch = useAppDispatch();
    const appIsLoading = useAppSelector(getAppStatusSelector);
    const isLogin = useAppSelector(getAuthLoggedStatusSelector);
    const [time, setTime] = useState<Date>(new Date());
    useEffect(() => {
        const timerId = window.setTimeout(() => setTime(new Date()), 1000);
        return () => clearTimeout(timerId);
    }, [time]);
    const logOutHandler = () => {
        dispatch(authThunks.logout());
    };

    return (
        <div className={s.headerBody}>
            <div className={container.appContainer}>
                <h1 className={s.title}>Todo List</h1>
                <h2 className={s.time}>Today {moment(time).format('MMMM Do YYYY, h:mm')}</h2>
                {isLogin && (
                    <Button callback={logOutHandler} style={s.btnStyle}>
                        <span>Log Out</span>
                        <FiLogOut />
                    </Button>
                )}
            </div>
            {appIsLoading === EntityStatus.LOADING && <ProgressBar />}
        </div>
    );
};
