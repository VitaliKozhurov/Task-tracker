import React from 'react';
import 'app/App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from 'features/login/Login';
import { TodoLists } from 'features/todoLists/TodoLists';
import { MainPage } from 'features/mainPage/MainPage';
import { Layout } from 'features/layout/Layout';
import { RequireAuth } from 'utils/RequireAuth';

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
