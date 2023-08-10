import React, { useEffect } from 'react';
import { Header } from 'common/components/Header/Header';
import { Outlet } from 'react-router-dom';
import { ErrorNotification } from 'common/components/ErrorNotification/ErrorNotification';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { getAppInitializedStatusSelector } from 'app/model/app-selectors';
import { appThunks } from 'app/model/app-slice';
import { InitializeComponent } from 'common/components/InitializeComponent/InitializeComponent';

export const Layout = () => {
    const dispatch = useAppDispatch();
    const isInitialized = useAppSelector(getAppInitializedStatusSelector);

    useEffect(() => {
        dispatch(appThunks.authMe());
    }, []);

    if (!isInitialized) {
        return <InitializeComponent />;
    }
    return (
        <div className="App">
            <Header />
            <Outlet />
            <ErrorNotification />
        </div>
    );
};
