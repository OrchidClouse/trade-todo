import { useState } from 'react';
import { Task } from 'types/Task';
import { Modal, TaskControl } from 'components';
import { DraggableTask } from './DraggableTask';
import styles from './TaskItem.module.scss'

interface ITaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<ITaskItemProps> = ({task}) => {
  
  const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false);

  return (
    <>
      <DraggableTask key={task.id} id={task.id.toString()}>
        <>
          <div className={styles.item} onClick={() => setIsTaskDetailsOpen(true)}>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <br />
            <span>id: {task.id}</span>
          </div>
        </>
      </DraggableTask>
      <Modal
        title={<h3>{task.title}</h3>}
        opened={isTaskDetailsOpen}
        onClose={() => setIsTaskDetailsOpen(false)}
      >
        <TaskControl task={task} />
      </Modal>
    </>
  );
};
