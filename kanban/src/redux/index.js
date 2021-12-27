import { configureStore } from '@reduxjs/toolkit';
import { getFromLocalStorage, saveToLocalStorageWithDebounce } from '../helpers/utils';
import projects, { initialState as projectsInitialState } from './projectsSlice';

export const initialState = {
  projects: projectsInitialState,
};

const localStorageKey = 'kanban-store';
const preloadedState = getFromLocalStorage(localStorageKey) || initialState;

export const store = configureStore({
  reducer: { projects },
  preloadedState,
});

store.subscribe(() => {
  saveToLocalStorageWithDebounce(localStorageKey, store.getState());
});
