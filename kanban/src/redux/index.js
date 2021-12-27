import { configureStore } from '@reduxjs/toolkit';
import { getFromLocalStorage, saveToLocalStorageWithDebounce } from '../helpers/utils';
import projects, { initialState as projectsInitialState } from './projectsSlice';

export const initialState = {
  projects: projectsInitialState,
};

const localStorageKey = 'kanban-store';
const preloadedState = getFromLocalStorage(localStorageKey) || initialState;
const localStorageMiddleware = (store) => (next) => (action) => {
  saveToLocalStorageWithDebounce(localStorageKey, store.getState());
  next(action);
};

export const store = configureStore({
  reducer: { projects },
  ...(preloadedState ? { preloadedState } : {}),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});
