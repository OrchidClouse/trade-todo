import { Project } from '../../types/Project';
import {
  AddProjectActionType,
  RemoveProjectActionType,
  UpdateProjectActionType
} from './projectsActions';
import { ADD_PROJECT, REMOVE_PROJECT, UPDATE_PROJECT } from './projectsConsts';

type ProjectsActionsType = AddProjectActionType | RemoveProjectActionType | UpdateProjectActionType;

const projectsInitialState: Project[] = [];

export const projectsReducer = (
  state = projectsInitialState,
  action: ProjectsActionsType
) => {
  switch (action.type) {
    case ADD_PROJECT: {
      const newState: Project[] = [
        ...state,
        {
          id: Date.now().toString(),
          name: action.payload.name,
        },
      ];

      return newState;
    }
    case REMOVE_PROJECT: {
      return state.filter((project) => project.id !== action.payload.id);
    }
    case UPDATE_PROJECT: {
      return state.map((project) =>
        project.id === action.payload.id ? { ...project, name: action.payload.name } : project
      );
    }
    default: {
      return state;
    }
  }
};
