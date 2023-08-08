import React, { FC } from 'react';
import { useAppSelector } from 'common/hooks/hooks';
import { getAuthLoggedStatusSelector } from 'features/login/auth.selectors';
import { Navigate } from 'react-router-dom';

type RequireAuthPropsType = {
    children: React.ReactNode;
};

export const RequireAuth: FC<RequireAuthPropsType> = ({ children }) => {
    const isLoggedIn = useAppSelector(getAuthLoggedStatusSelector);

    if (!isLoggedIn) {
        return <Navigate to={'/login'} />;
    }
    return <>{children}</>;
};
