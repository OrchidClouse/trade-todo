import { RootState } from '..';
import { Status } from '../../types/Task';

export const selectProjectTasks = (state: RootState, projectId: string) => {
  return state.tasks.filter((task) => task.projectId === projectId);
};

export const selectTaskById = (state: RootState, id: string) => {
  return state.tasks.find((task) => task.id === id);
};

export const selectTasksByStatus = (state: RootState, status: Status) => {
  return state.tasks.filter((task) => task.status === status);
};

export const selectComments = (state: RootState, taskId: string) => {
  const task = state.tasks.find((task) => task.id === taskId);

  return task?.comments?.filter(
    (commentary) => commentary.parentId === undefined
  );
};

export const selectReplyComments = (
  state: RootState,
  taskId: string,
  parentId: string
) => {
  const task = state.tasks.find((task) => task.id === taskId);
  return task?.comments?.filter(
    (commentary) => commentary.parentId === parentId
  );
};
