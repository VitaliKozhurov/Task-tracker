import React from 'react';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { getAuthLoggedStatusSelector } from 'features/login/auth.selectors';
import { Button } from 'components/Button/Button';
import s from './Header.module.scss';
import container from '../../common/style/commonStyle.module.scss';
import { FiLogOut } from 'react-icons/fi';
import { authThunks } from 'features/login/authSlice';

export const Header = () => {
    const dispatch = useAppDispatch();
    const isLogin = useAppSelector(getAuthLoggedStatusSelector);
    const logOutHandler = () => {
        dispatch(authThunks.logout());
    };

    return (
        <div className={container.appContainer}>
            <div className={s.headerBody}>
                <h1 className={s.title}>Todo List</h1>
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
