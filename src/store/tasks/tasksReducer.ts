import { Comment, Status, Task } from '../../types/Task';
import {
  AddTaskActionType,
  RemoveTaskActionType,
  ChangeSubtaskStatusActionType,
  ChangeTaskStatusActionType,
  ChangeTaskPriorityActionType,
  AddSubtaskActionType,
  RemoveSubtaskActionType,
  ChangeSubtaskTitleActionType,
  ChangeTaskDescriptionActionType,
  AddCommentActionType,
  AddReplyCommentActionType,
  RemoveCommentActionType,
  ChangeTaskTitleActionType,
  AddFileActionType,
  RemoveFileActionType,
} from './tasksActions';
import {
  ADD_COMMENT,
  ADD_FILE,
  ADD_REPLY_COMMENT,
  ADD_SUBTASK,
  ADD_TASK,
  CHANGE_SUBTASK_STATUS,
  CHANGE_SUBTASK_TITLE,
  CHANGE_TASK_DESCRIPTION,
  CHANGE_TASK_PRIORITY,
  CHANGE_TASK_STATUS,
  CHANGE_TASK_TITLE,
  REMOVE_COMMENT,
  REMOVE_FILE,
  REMOVE_SUBTASK,
  REMOVE_TASK,
} from './tasksConsts';

type TasksActionsType =
  | AddTaskActionType
  | RemoveTaskActionType
  | ChangeTaskTitleActionType
  | ChangeTaskStatusActionType
  | ChangeTaskDescriptionActionType
  | ChangeTaskPriorityActionType
  | AddSubtaskActionType
  | ChangeSubtaskStatusActionType
  | RemoveSubtaskActionType
  | ChangeSubtaskTitleActionType
  | AddCommentActionType
  | AddReplyCommentActionType
  | RemoveCommentActionType
  | AddFileActionType
  | RemoveFileActionType;

const tasksInitialState: Task[] = [];

export const tasksReducer = (
  state = tasksInitialState,
  action: TasksActionsType
) => {
  switch (action.type) {
    case ADD_TASK: {
      const newState: Task[] = [
        ...state,
        {
          id: Date.now().toString(),
          title: action.payload.title,
          description: action.payload.description,
          creationDate: new Date(),
          developmentStartTime:
            action.payload.status === 'queue' ? undefined : new Date(),
          doneTime: action.payload.status === 'done' ? new Date() : undefined,
          priority: action.payload.priority,
          attachedFiles: action.payload.attachedFiles,
          status: action.payload.status,
          subtasks: action.payload.subtasks,
          comments: action.payload.comments,
          projectId: action.payload.projectId,
        },
      ];

      return newState;
    }
    case REMOVE_TASK: {
      const newState: Task[] = state.filter(
        (task) => task.id !== action.payload.taskId
      );
      return newState;
    }
    case CHANGE_TASK_TITLE: {
      const newState: Task[] = state.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              title: action.payload.newTitle,
            }
          : task
      );
      return newState;
    }
    case CHANGE_TASK_STATUS: {
      const newState = state.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              developmentStartTime:
                action.payload.newStatus === 'queue'
                  ? undefined
                  : task.developmentStartTime
                  ? task.developmentStartTime
                  : new Date(),
              doneTime:
                action.payload.newStatus === 'done' ? new Date() : undefined,
              status: action.payload.newStatus,
            }
          : task
      );

      return newState;
    }
    case CHANGE_TASK_DESCRIPTION: {
      const newState = state.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              description: action.payload.newDescription,
            }
          : task
      );

      return newState;
    }
    case CHANGE_TASK_PRIORITY: {
      const newState = state.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              priority: action.payload.newPriority,
            }
          : task
      );

      return newState;
    }
    case ADD_SUBTASK: {
      const newState = state.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              subtasks: [
                ...task.subtasks,
                {
                  id: Date.now().toString(),
                  status: false,
                  title: action.payload.title,
                },
              ],
            }
          : task
      );

      return newState;
    }
    case CHANGE_SUBTASK_STATUS: {
      const newState = state.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              subtasks: [
                ...task.subtasks.map((subtask) => {
                  if (subtask.id === action.payload.subtaskId) {
                    return {
                      ...subtask,
                      status: !subtask.status,
                    };
                  }
                  return subtask;
                }),
              ],
            }
          : task
      );
      return newState;
    }
    case REMOVE_SUBTASK: {
      const newState = state.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              subtasks: [
                ...task.subtasks.filter(
                  (subtask) => subtask.id !== action.payload.subtaskId
                ),
              ],
            }
          : task
      );

      return newState;
    }
    case CHANGE_SUBTASK_TITLE: {
      const newState = state.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              subtasks: [
                ...task.subtasks.map((subtask) => {
                  if (subtask.id === action.payload.subtaskId) {
                    return {
                      ...subtask,
                      title: action.payload.title,
                    };
                  }
                  return subtask;
                }),
              ],
            }
          : task
      );
      return newState;
    }
    case ADD_COMMENT: {
      const newState = state.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              comments: [
                ...task.comments,
                {
                  id: Date.now().toString(),
                  text: action.payload.text,
                },
              ],
            }
          : task
      );

      return newState;
    }

    case ADD_REPLY_COMMENT: {
      const newState = state.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              comments: [
                ...task.comments,
                {
                  id: Date.now().toString(),
                  parentId: action.payload.parentId,
                  text: action.payload.text,
                },
              ],
            }
          : task
      );

      return newState;
    }
    case REMOVE_COMMENT: {
      const task = state.find((task) => task.id === action.payload.taskId);

      const deletingComment = task?.comments.find(
        (comment) => comment.id === action.payload.commentId
      );

      const findDependentItems = (
        task: Task,
        dependencyComment: Comment
      ): Comment[] => {
        const dependentItems: Comment[] = [];

        task.comments.forEach((comment) => {
          if (comment.parentId === dependencyComment.id) {
            dependentItems.push(comment);
            const nextDependents = findDependentItems(task, comment);
            nextDependents.forEach((dep) => dependentItems.push(dep));
          }
        });

        return dependentItems;
      };

      const findDeadDependencies = (
        task: Task,
        dependentComment: Comment
      ): Comment[] => {
        const dependencies: Comment[] = [];

        task.comments.forEach((comment) => {
          if (comment.id === dependentComment.parentId && comment.text === '') {
            dependencies.push(comment);
            const nextDependency = findDeadDependencies(task, comment);
            nextDependency.forEach((dep) => dependencies.push(dep));
          }
        });

        return dependencies;
      };

      const deadDependencies =
        task && deletingComment
          ? findDeadDependencies(task, deletingComment).filter(
              (maybeDeadDependency) => {
                return (
                  findDependentItems(task, maybeDeadDependency).filter(
                    (dep) => dep.id !== deletingComment.id && dep.text !== ''
                  ).length < 1
                );
              }
            )
          : null;

      const commentReplies =
        task && deletingComment
          ? findDependentItems(task, deletingComment)
          : null;

      const dependentComments = commentReplies?.filter(
        (reply) => reply.text !== ''
      );

      const preNewState = state.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              comments: task.comments
                .filter(
                  (comment) =>
                    comment.id !== action.payload.commentId ||
                    dependentComments?.length
                )
                .map((comment) => {
                  if (comment.id === action.payload.commentId) {
                    return {
                      ...comment,
                      text: '',
                    };
                  }

                  return comment;
                }),
            }
          : task
      );

      const newState = preNewState.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              comments: task.comments.filter(
                (comment) =>
                  !deadDependencies?.includes(comment) ||
                  dependentComments?.length
              ),
            }
          : task
      );
      // console.log('preNewState: ', preNewState);
      // console.log('deadDependencies: ', deadDependencies);
      // console.log('newState: ', newState);

      return newState;
    }
    case ADD_FILE: {
      const newState = state.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              attachedFiles: task.attachedFiles.concat(action.payload.file),
            }
          : task
      );

      return newState;
    }
    case REMOVE_FILE: {
      const newState = state.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              attachedFiles: task.attachedFiles.filter(
                (file) => file.id !== action.payload.fileId
              ),
            }
          : task
      );

      return newState;
    }
    default: {
      return state;
    }
  }
};
