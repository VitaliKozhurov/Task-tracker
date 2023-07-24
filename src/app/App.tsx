import React from 'react';
import 'app/App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from '../features/login/Login';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={''} element={<h1>Main Page</h1>} />
                <Route path={'/login'} element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
