import { toyReducer } from './store/reducers/toy.Reducer.js'
import { userReducer } from '../store/reducers/user.Reducer.js'

import { createStore, combineReducers, compose } from 'redux'

const rootReducer = combineReducers({
    toyModule: toyReducer,
    userModule: userReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())


window.gStore = store


