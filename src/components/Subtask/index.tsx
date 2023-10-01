import { Task } from "types/Task";
import { AddSubtask } from "./AddSubtask";
import { SubtaskItem } from "./SubtaskItem";
import styles from "./Subtask.module.scss";

interface ISubtasksProps {
  task: Task;
}

export const Subtasks: React.FC<ISubtasksProps> = ({ task }) => {
  return (
    <div>
      {task.subtasks.length ? (
        <div>
          {task.subtasks.map((subtask) => (
            <SubtaskItem key={subtask.id} subtask={subtask} taskId={task.id} />
          ))}
          <AddSubtask taskId={task.id} />
        </div>
      ) : (
        <AddSubtask taskId={task.id} />
      )}
    </div>
  );
};
