import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { authReducer } from '../reducers/authReducer';
import thunk from 'redux-thunk';
import { uiReducer } from '../reducers/uiReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// aqui podemos agregar muchos reducer
const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer
});

// createStore solo recibe 1 reducer
export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware( thunk )
    )
    );