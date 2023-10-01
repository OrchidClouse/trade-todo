import { useState, MouseEvent } from 'react';
import styles from './Subtask.module.scss';
import { useAppDispatch } from 'hooks/reduxHooks';
import {
  changeSubtaskStatus,
  changeSubtaskTitle,
  removeSubtask,
} from 'store/tasks/tasksActions';
import { Input, Button } from 'components';
import { Subtask } from 'types/Task';

interface ISubtaskItemProps {
  subtask: Subtask;
  taskId: string;
}

export const SubtaskItem: React.FC<ISubtaskItemProps> = ({ subtask, taskId }) => {

  const dispatch = useAppDispatch();

  const [isChangeTitleInputOpen, setIsChangeTitleInputOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(subtask.title);

  const handleChangeSubtaskStatus = () => {
    dispatch(
      changeSubtaskStatus({
        taskId,
        subtaskId: subtask.id,
      })
    );
  };

  const handleChangeSubtaskTittle = () => {
    setIsChangeTitleInputOpen(true);
  };

  const handleRemoveSubtask = () => {
    dispatch(
      removeSubtask({
        taskId,
        subtaskId: subtask.id,
      })
    );
  };

  const handleCancelEditSubtaskTitle = (e: MouseEvent) => {
    e.preventDefault();
    setIsChangeTitleInputOpen(false);
  };

  const handleApplySubtaskTittleChange = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(
      changeSubtaskTitle({
        taskId,
        subtaskId: subtask.id,
        title: newTitle,
      })
    );
    handleCancelEditSubtaskTitle(e);
  };

  return (
    <div key={subtask.id} className={styles.subtaskItem}>
      <div className={styles.title}>
        <input
          type="checkbox"
          checked={subtask.status}
          onChange={handleChangeSubtaskStatus}
        />
        {isChangeTitleInputOpen ? (
          <form className={styles.changeTitleForm}>
            <Input
			  size='small'
              value={newTitle}
              onChange={(e) => {
                setNewTitle(e.target.value);
              }}
            />
            <div className={styles.buttons}>
			  <Button
				type='primary'
				title='Apply'
				size='small'
				onClick={handleApplySubtaskTittleChange}
			  />
			  <Button 
			  	type='delete'
				title='Cancel'
				size='small'
				onClick={handleCancelEditSubtaskTitle}
			  />
            </div>
          </form>
        ) : (
          <div className={subtask.status ? styles.completedTaskTitle : styles.subtaskTitle}>
            {subtask.title}
          </div>
        )}
      </div>
      {!isChangeTitleInputOpen ? (
        <div className={styles.buttons}>
		  <Button
				type='primary'
				title='Change'
				size='small'
				onClick={handleChangeSubtaskTittle}
			  />
			  <Button 
			  	type='delete'
				title='Delete'
				size='small'
				onClick={handleRemoveSubtask}
			  />
        </div>
      ) : null}
    </div>
  );
};
