import React, { useEffect } from 'react';
import 'app/App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from 'features/login/Login';
import { TodoLists } from 'features/todoLists/TodoLists';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { getAppInitializedStatusSelector } from 'app/app.selectors';
import { appThunks } from 'app/appSlice';
import { Header } from 'components/Header/Header';

const App = () => {
    const dispatch = useAppDispatch();
    const isInitialized = useAppSelector(getAppInitializedStatusSelector);

    useEffect(() => {
        dispatch(appThunks.authMe());
    }, []);

    if (!isInitialized) {
        return <h1>Initializing...</h1>;
    }

    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path={''} element={<TodoLists />} />
                <Route path={'/login'} element={<Login />} />
            </Routes>
        </div>
    );
};

export default App;
