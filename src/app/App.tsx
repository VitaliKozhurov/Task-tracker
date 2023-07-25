import React from 'react';
import 'app/App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from 'features/login/Login';
import { TodoLists } from 'features/todoLists/TodoLists';

function App() {
    return (
        <div className="App">
            {/*<h1>Header</h1>*/}
            <Routes>
                <Route path={''} element={<TodoLists />} />
                <Route path={'/login'} element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
