import { useState } from "react";
import styles from "./TaskControl.module.scss";
import { Task } from "types/Task";
import { useAppDispatch } from "hooks/reduxHooks";
import { removeTask } from "store/tasks/tasksActions";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { PrioritySlider, Button, Subtasks, Comment, AddFile } from "components";

dayjs.extend(relativeTime);

interface ITaskControlProps {
  task: Task;
}

const TaskCreationDate = ({ date }: { date: Date }) => (
  <div>Created {dayjs(date).format("DD MMMM YYYY [at] HH:mm")}</div>
);

const TaskDevelopmentTime = ({
  developmentStartTime,
  doneTime,
}: {
  developmentStartTime: Date | undefined;
  doneTime: Date | undefined;
}) =>
  developmentStartTime && doneTime ? (
    <div>{dayjs(developmentStartTime).to(doneTime, true)} in development</div>
  ) : null;

const TaskDoneTime = ({ doneTime }: { doneTime: Date | undefined }) =>
  doneTime ? (
    <div>Done {dayjs(doneTime).format("DD MMMM YYYY [at] HH:mm")}</div>
  ) : null;

export const TaskControl: React.FC<ITaskControlProps> = ({ task }) => {
  const {
    id,
    priority: taskPriority,
    status,
    creationDate,
    doneTime,
    developmentStartTime,
  } = task;
  const [priority, setPriority] = useState(taskPriority);
  const dispatch = useAppDispatch();

  const handleRemoveTask = () => {
    dispatch(removeTask(id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <Button title="Remove task" type="delete" onClick={handleRemoveTask} />
      </div>
      <p>{status}</p>
      <TaskDevelopmentTime
        developmentStartTime={developmentStartTime}
        doneTime={doneTime}
      />
      <TaskCreationDate date={creationDate} />
      <TaskDoneTime doneTime={doneTime} />
      <div className={`${styles.wrap}`}>
        <h3>Priority: {priority}</h3>
        <PrioritySlider
          priority={priority}
          setPriority={setPriority}
          taskId={id}
        />
      </div>
      <div className={`${styles.wrap}`}>
        <h3>Subtask</h3>
        <Subtasks task={task} />
      </div>
      <div className={`${styles.wrap}`}>
        <h3>Comment</h3>
        <Comment taskId={id} />
      </div>
      <div className={`${styles.wrap}`}>
        <h3>Add file</h3>
        <AddFile task={task} />
      </div>
    </div>
  );
};
