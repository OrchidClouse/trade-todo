import { combineReducers } from 'redux';
import { projectsReducer } from './projects/projectsReducer';
import { tasksReducer } from './tasks/tasksReducer';

export const rootReducer = combineReducers({
  projects: projectsReducer,
  tasks: tasksReducer,
});
