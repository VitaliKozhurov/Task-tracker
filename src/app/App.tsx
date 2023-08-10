import React from 'react';
import 'app/App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from 'features/login/ui/Login';
import { TodoLists } from 'features/todolists/TodoLists';
import { MainPage } from 'features/mainPage/ui/MainPage';
import { Layout } from 'app/layout/Layout';
import { RequireAuth } from 'common/utils/RequireAuth';

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
            </Route>
        </Routes>
    );
};

export default App;
