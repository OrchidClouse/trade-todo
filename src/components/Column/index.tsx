import { useState, useCallback } from "react";
import styles from "./Column.module.scss";
import { useDroppable } from "@dnd-kit/core";
import { Task, Status } from "types/Task";
import { Modal, CreateTask, TaskItem } from "components";

interface IColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  projectId: string;
}

const titleToStatus = (title: string): Status => {
  if (title === "queue") return title;
  if (title === "development") return title;
  return "done";
};

export const Column: React.FC<IColumnProps> = ({
  id,
  title,
  tasks,
  projectId,
}) => {
  const { setNodeRef, over, isOver, active } = useDroppable({
    id,
  });

  const [isCreateTaskFormOpen, setIsCreateTaskFormOpen] = useState(false);

  const status = titleToStatus(title);

  const handleAddTask = useCallback(() => {
    setIsCreateTaskFormOpen(true);
  }, []);

  return (
    <>
      <div
        className={`${styles.column} ${isOver ? styles.over : ""}`}
        ref={setNodeRef}
      >
        <div className={styles.header}>
          {title.toUpperCase()}
          <button className={`${styles.addTaskButton}`} onClick={handleAddTask}>
            +
          </button>
        </div>
        <div className={`${styles.separator}`}></div>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
      <Modal
        title={<h2>{`Create ${status} task`}</h2>}
        opened={isCreateTaskFormOpen}
        onClose={() => setIsCreateTaskFormOpen(false)}
      >
        <CreateTask
          taskStatus={status}
          projectId={projectId}
          closeModal={() => setIsCreateTaskFormOpen(false)}
        />
      </Modal>
    </>
  );
};
