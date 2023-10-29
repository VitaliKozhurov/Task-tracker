import React from 'react';
import ReactDOM from 'react-dom/client';
import 'index.scss';
import App from 'app/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'app/model/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
        <BrowserRouter basename='/todolists'>
            <App />
        </BrowserRouter>
    </Provider>,
);

reportWebVitals();
