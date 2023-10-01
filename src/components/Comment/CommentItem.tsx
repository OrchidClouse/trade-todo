import { MouseEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { addReplyComment, removeComment } from "store/tasks/tasksActions";
import { selectReplyComments } from "store/tasks/tasksSelectors";
import { Comment } from "types/Task";
import styles from "./Comment.module.scss";
import { Button, Input } from "components";

interface ICommentItemProps {
  taskId: string;
  comment: Comment;
}

export const CommentItem: React.FC<ICommentItemProps> = ({
  taskId,
  comment,
}) => {
  const dispatch = useAppDispatch();

  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);
  const [reply, setReply] = useState("");

  const replies = useAppSelector((state) =>
    selectReplyComments(state, taskId, comment.id),
  );

  const handleOpenReplyForm = () => {
    setIsReplyFormOpen(true);
  };

  const handleCancelReplyCreation = (e: MouseEvent) => {
    e.preventDefault();
    setReply("");
    setIsReplyFormOpen(false);
  };

  const handleAddReplyComment = (e: MouseEvent, parentId: string) => {
    e.preventDefault();
    if (reply)
      dispatch(
        addReplyComment({
          taskId,
          parentId,
          text: reply,
        }),
      );
    setReply("");
    setIsReplyFormOpen(false);
  };

  const handleRemoveComment = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(
      removeComment({
        taskId,
        commentId: comment.id,
      }),
    );
  };

  return (
    <div key={comment.id} className={styles.item}>
      {comment.text ? (
        <div className={styles.comment}>
          <div className={styles.content}>
            <span>{comment.text}</span>
            <div className={styles.buttons}>
              <Button
                size="small"
                type="primary"
                title="Reply"
                onClick={handleOpenReplyForm}
              />
              <Button
                size="small"
                type="delete"
                title="Remove"
                onClick={handleRemoveComment}
              />
            </div>
          </div>
          {isReplyFormOpen ? (
            <form
              className={`${styles.addReplyForm} ${styles.replies} ${styles.item}`}
            >
              <Input
                size="small"
                onChange={(e) => {
                  setReply(e.currentTarget.value);
                }}
                value={reply}
                placeholder="What are your thoughts?"
              />
              <div className={styles.buttons}>
                <Button
                  size="small"
                  type="primary"
                  title="Reply"
                  onClick={(e) => handleAddReplyComment(e, comment.id)}
                  disabled={!reply}
                />
                <Button
                  size="small"
                  type="delete"
                  title="Cancel"
                  onClick={handleCancelReplyCreation}
                />
              </div>
            </form>
          ) : null}
        </div>
      ) : (
        <>
          <p>Comment was deleted</p>
          <br />
        </>
      )}

      {replies ? (
        <div className={styles.replies}>
          {replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} taskId={taskId} />
          ))}
        </div>
      ) : null}
    </div>
  );
};
