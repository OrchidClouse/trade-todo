import { Project } from '../../types/Project';
import {
  AddProjectActionType,
  RemoveProjectActionType,
} from './projectsActions';
import { ADD_PROJECT, REMOVE_PROJECT } from './projectsConsts';

type ProjectsActionsType = AddProjectActionType | RemoveProjectActionType;

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
    default: {
      return state;
    }
  }
};
