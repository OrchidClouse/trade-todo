import { createStore } from 'redux';
import { loadState, saveState } from './localStorage';
import { rootReducer } from './rootReducer';

export const configureStore = () => {
  const persistedState = loadState();
  const store = createStore(rootReducer, persistedState);

  store.subscribe(() =>
    saveState({
      projects: store.getState().projects,
      tasks: store.getState().tasks,
    })
  );

  return store;
};

export const store = configureStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
