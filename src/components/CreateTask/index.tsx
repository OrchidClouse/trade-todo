import { useReducer, MouseEvent, useEffect } from 'react';
import { useAppDispatch } from 'hooks/reduxHooks';
import { addTask } from 'store/tasks/tasksActions';
import { Priority, Status } from 'types/Task';
import styles from './CreateTask.module.scss';
import { Input, Button, PrioritySlider } from 'components';

interface ICreateTaskProps {
  taskStatus: Status;
  projectId: string;
  closeModal(): void;
}

interface IState {
  title: string;
  isTitleValid: boolean;
  description: string;
  priority: Priority;
}

const initialState: IState = {
  title: '',
  isTitleValid: false,
  description: '',
  priority: Priority.Priority1,
};

function reducer(state: IState, action: { type: string; payload: any }): IState {
  switch (action.type) {
    case 'setTitle':
      return { ...state, title: action.payload, isTitleValid: !!action.payload };
    case 'setDescription':
      return { ...state, description: action.payload };
    case 'setPriority':
      return { ...state, priority: action.payload };
    default:
      throw new Error();
  }
}

export const CreateTask: React.FC<ICreateTaskProps> = ({ taskStatus, projectId, closeModal }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const appDispatch = useAppDispatch();

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();
    appDispatch(
      addTask({
        ...state,
        status: taskStatus,
        subtasks: [],
        comments: [],
        attachedFiles: [],
        projectId,
      })
    );
    dispatch({ type: 'setTitle', payload: '' });
    dispatch({ type: 'setDescription', payload: '' });
    closeModal();
  };

  return (
    <form className={styles.form}>
      <div className={styles.input}>
        <label htmlFor="title">Title</label>
        <Input
          id="title"
          onChange={(e) => {
            dispatch({ type: 'setTitle', payload: e.target.value });
          }}
          value={state.title}
        />
        <label htmlFor="description">Description</label>
        <Input
          id="description"
          onChange={(e) => {
            dispatch({ type: 'setDescription', payload: e.target.value });
          }}
          value={state.description}
        />
        <label>Priority: {state.priority}</label>
        <PrioritySlider priority={state.priority} setPriority={(priority) => dispatch({ type: 'setPriority', payload: priority })} />
      </div>
      <Button onClick={handleSubmit} title='Right' disabled={!state.isTitleValid} />
    </form>
  );
};