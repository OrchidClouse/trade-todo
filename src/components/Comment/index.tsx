import { MouseEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { addComment } from "store/tasks/tasksActions";
import { selectComments } from "store/tasks/tasksSelectors";
import { CommentItem } from "./CommentItem";
import styles from "./Comment.module.scss";
import { Button, Input } from "components";

interface ICommentProps {
  taskId: string;
}

export const Comment: React.FC<ICommentProps> = ({ taskId }) => {
  const dispatch = useAppDispatch();

  const [comment, setComment] = useState("");

  const comments = useAppSelector((state) => selectComments(state, taskId));

  const handleAddComment = (e: MouseEvent) => {
    e.preventDefault();
    if (comment)
      dispatch(
        addComment({
          taskId,
          text: comment,
        }),
      );
    setComment("");
  };

  return (
    <>
      <form className={styles.form}>
        <Input
          size="small"
          placeholder="What else?.."
          onChange={(e) => {
            setComment(e.target.value);
          }}
          value={comment}
        />
        <Button
          type="primary"
          title="Comment"
          size="small"
          onClick={handleAddComment}
          disabled={!comment}
        />
      </form>
      {comments ? (
        <div className={styles.comments}>
          {comments?.map((comment) => (
            <CommentItem key={comment.id} taskId={taskId} comment={comment} />
          ))}
        </div>
      ) : null}
    </>
  );
};
