import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { getAuthLoggedStatusSelector } from 'features/login/auth.selectors';
import { Button } from 'components/Button/Button';
import s from './Header.module.scss';
import container from '../../common/style/commonStyle.module.scss';
import { FiLogOut } from 'react-icons/fi';
import { authThunks } from 'features/login/authSlice';
import moment from 'moment';

export const Header = () => {
    const dispatch = useAppDispatch();
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
        <div className={container.appContainer}>
            <div className={s.headerBody}>
                <h1 className={s.title}>Todo List</h1>
                <h2 className={s.time}>Today {moment(time).format('MMMM Do YYYY, h:mm')}</h2>
                {isLogin && (
                    <Button callback={logOutHandler} style={s.btnStyle}>
                        <span>Log Out</span>
                        <FiLogOut />
                    </Button>
                )}
            </div>
        </div>
    );
};
