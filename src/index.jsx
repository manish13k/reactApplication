import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './handler';
import { App } from './App';
import { configureFakeBackend } from './handler';
//configureFakeBackend();
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);