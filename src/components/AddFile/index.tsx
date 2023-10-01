import { ChangeEvent, useRef, useCallback } from "react";
import styles from "./AddFile.module.scss";
import { useAppDispatch } from "hooks/reduxHooks";
import { addFile, removeFile } from "store/tasks/tasksActions";
import { Task } from "types/Task";
import { Button } from "components";

interface IAddFileProps {
  task: Task;
}

const createFileObject = (file: File, index: number) => ({
  id: (Date.now() + index).toString(),
  name: file.name,
  size: file.size,
  type: file.type,
});

export const AddFile: React.FC<IAddFileProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files ?? []);
      const myFiles = selectedFiles.map(createFileObject);
      dispatch(addFile({ taskId: task.id, file: myFiles }));
    },
    [dispatch, task.id],
  );

  const handlePick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleRemoveFile = useCallback(
    (fileId: string) => {
      dispatch(removeFile({ taskId: task.id, fileId }));
    },
    [dispatch, task.id],
  );

  return (
    <div>
      <input
        className={`${styles.fileInput}`}
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleUpload}
      />
      <div>
        <div>
          {task.attachedFiles.map((file) => (
            <div key={file.id} className={styles.fileItem}>
              <p>{file.name}</p>
              <Button
                size="small"
                type="delete"
                title="Remove"
                onClick={() => handleRemoveFile(file.id)}
              />
            </div>
          ))}
        </div>
        <Button size="small" title="Add file" onClick={handlePick} />
      </div>
    </div>
  );
};
