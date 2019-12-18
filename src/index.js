import React from 'react';
import ReactDOM from 'react-dom';
import { Provider }  from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools} from 'redux-devtools-extension';
import axios from 'axios';

import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';

// -------------------- Настройки, подготовка ---------------

const defaultState = {
    menu: "some str"
};

const FETCH_MENU_SUCCESS = 'FETCH_MENU_SUCCESS'
const menuReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_MENU_SUCCESS:
            state.menu = action.menu;
            return state;
        default:
            return state;
    }
};

const store = createStore(menuReducer);

// -------------------- Отсюда идет работа с данными --------------------

const actionFetchMenu = (menu) => ({
    type: 'FETCH_MENU_SUCCESS',
    menu: menu
});

window.actionFetchMenu = actionFetchMenu;

const fetchMenu = async () => {
    const response = await axios.get('https://test-461bf.firebaseio.com/menu.json/');
    return response.data;
}

// fetchMenu().then(menu => store.dispatch(actionFetchMenu(menu)))


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

window.store = store;