import { combineReducers, createStore } from 'redux'
import { projects } from './reducers/projects'

const rootReducer = combineReducers({ projects })

export const store = createStore(rootReducer)
