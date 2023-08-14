import React from 'react';
import 'app/App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from 'features/login/ui/Login';
import { TodoLists } from 'features/todolists/TodoLists';
import { MainPage } from 'features/mainPage/ui/MainPage';
import { Layout } from 'app/layout/Layout';
import { RequireAuth } from 'common/utils/RequireAuth';
import { PageNotFound } from 'common/components/PageNotFound/PageNotFound';

const App = () => {
    return (
        <Routes>
            <Route path={''} element={<Layout />}>
                <Route index element={<MainPage />} />
                <Route
                    path={'/todolists'}
                    element={
                        <RequireAuth>
                            <TodoLists />
                        </RequireAuth>
                    }
                />
                <Route path={'/login'} element={<Login />} />
                <Route path={'/not-found'} element={<PageNotFound />} />
                <Route path={'*'} element={<Navigate to={'not-found'} />} />
            </Route>
        </Routes>
    );
};

export default App;
