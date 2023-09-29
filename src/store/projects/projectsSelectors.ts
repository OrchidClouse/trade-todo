import { RootState } from '..';

export const selectProjectById = (state: RootState, projectId: string) => {
  return state.projects.find((project) => project.id === projectId);
};
