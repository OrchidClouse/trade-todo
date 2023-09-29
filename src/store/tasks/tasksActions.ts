import { MyFile, Priority, Status, Task } from '../../types/Task';
import {
  ADD_SUBTASK,
  ADD_TASK,
  CHANGE_SUBTASK_STATUS,
  CHANGE_TASK_STATUS,
  CHANGE_SUBTASK_TITLE,
  REMOVE_SUBTASK,
  REMOVE_TASK,
  CHANGE_TASK_DESCRIPTION,
  ADD_COMMENT,
  ADD_REPLY_COMMENT,
  REMOVE_COMMENT,
  CHANGE_TASK_TITLE,
  ADD_FILE,
  CHANGE_TASK_PRIORITY,
  REMOVE_FILE,
} from './tasksConsts';

type TaskInputData = Omit<
  Task,
  'id' | 'creationDate' | 'developmentTime' | 'doneTime'
>;

export type AddTaskActionType = {
  type: typeof ADD_TASK;
  payload: TaskInputData;
};

export type RemoveTaskActionType = {
  type: typeof REMOVE_TASK;
  payload: {
    taskId: string;
  };
};

export type ChangeTaskTitleActionType = {
  type: typeof CHANGE_TASK_TITLE;
  payload: {
    taskId: string;
    newTitle: string;
  };
};

export type ChangeTaskStatusActionType = {
  type: typeof CHANGE_TASK_STATUS;
  payload: {
    taskId: string;
    newStatus: Status;
  };
};

export type ChangeTaskDescriptionActionType = {
  type: typeof CHANGE_TASK_DESCRIPTION;
  payload: {
    taskId: string;
    newDescription: string;
  };
};

export type ChangeTaskPriorityActionType = {
  type: typeof CHANGE_TASK_PRIORITY;
  payload: {
    taskId: string;
    newPriority: Priority;
  };
};

export type AddSubtaskActionType = {
  type: typeof ADD_SUBTASK;
  payload: {
    taskId: string;
    title: string;
  };
};

export type ChangeSubtaskStatusActionType = {
  type: typeof CHANGE_SUBTASK_STATUS;
  payload: {
    taskId: string;
    subtaskId: string;
  };
};

export type ChangeSubtaskTitleActionType = {
  type: typeof CHANGE_SUBTASK_TITLE;
  payload: {
    taskId: string;
    subtaskId: string;
    title: string;
  };
};

export type RemoveSubtaskActionType = {
  type: typeof REMOVE_SUBTASK;
  payload: {
    taskId: string;
    subtaskId: string;
  };
};

export type AddCommentActionType = {
  type: typeof ADD_COMMENT;
  payload: {
    taskId: string;
    text: string;
  };
};

export type AddReplyCommentActionType = {
  type: typeof ADD_REPLY_COMMENT;
  payload: {
    taskId: string;
    text: string;
    parentId: string;
  };
};

export type RemoveCommentActionType = {
  type: typeof REMOVE_COMMENT;
  payload: {
    taskId: string;
    commentId: string;
  };
};

export type AddFileActionType = {
  type: typeof ADD_FILE;
  payload: {
    taskId: string;
    file: MyFile[];
  };
};

export type RemoveFileActionType = {
  type: typeof REMOVE_FILE;
  payload: {
    taskId: string;
    fileId: string;
  };
};

export const addTask = (data: TaskInputData): AddTaskActionType => ({
  type: ADD_TASK,
  payload: data,
});

export const removeTask = (taskId: string): RemoveTaskActionType => ({
  type: REMOVE_TASK,
  payload: {
    taskId,
  },
});

export const changeTaskTitle = (
  taskId: string,
  newTitle: string
): ChangeTaskTitleActionType => ({
  type: CHANGE_TASK_TITLE,
  payload: {
    taskId,
    newTitle,
  },
});

export const changeTaskStatus = (
  taskId: string,
  newStatus: Status
): ChangeTaskStatusActionType => ({
  type: CHANGE_TASK_STATUS,
  payload: {
    taskId,
    newStatus,
  },
});

export const changeTaskDescription = ({
  taskId,
  newDescription,
}: {
  taskId: string;
  newDescription: string;
}): ChangeTaskDescriptionActionType => ({
  type: CHANGE_TASK_DESCRIPTION,
  payload: {
    taskId,
    newDescription,
  },
});

export const changeTaskPriority = ({
  taskId,
  newPriority,
}: {
  taskId: string;
  newPriority: Priority;
}): ChangeTaskPriorityActionType => ({
  type: CHANGE_TASK_PRIORITY,
  payload: {
    taskId,
    newPriority,
  },
});

export const addSubtask = ({
  taskId,
  title,
}: {
  taskId: string;
  title: string;
}): AddSubtaskActionType => ({
  type: ADD_SUBTASK,
  payload: {
    taskId,
    title,
  },
});

export const changeSubtaskStatus = ({
  taskId,
  subtaskId,
}: {
  taskId: string;
  subtaskId: string;
}): ChangeSubtaskStatusActionType => ({
  type: CHANGE_SUBTASK_STATUS,
  payload: {
    taskId,
    subtaskId,
  },
});

export const changeSubtaskTitle = ({
  taskId,
  subtaskId,
  title,
}: {
  taskId: string;
  subtaskId: string;
  title: string;
}): ChangeSubtaskTitleActionType => ({
  type: CHANGE_SUBTASK_TITLE,
  payload: {
    taskId,
    subtaskId,
    title,
  },
});

export const removeSubtask = ({
  taskId,
  subtaskId,
}: {
  taskId: string;
  subtaskId: string;
}): RemoveSubtaskActionType => ({
  type: REMOVE_SUBTASK,
  payload: {
    taskId,
    subtaskId,
  },
});

export const addComment = ({
  text,
  taskId,
}: {
  text: string;
  taskId: string;
}): AddCommentActionType => ({
  type: ADD_COMMENT,
  payload: {
    text,
    taskId,
  },
});

export const addReplyComment = ({
  text,
  parentId,
  taskId,
}: {
  text: string;
  parentId: string;
  taskId: string;
}): AddReplyCommentActionType => ({
  type: ADD_REPLY_COMMENT,
  payload: {
    text,
    parentId,
    taskId,
  },
});

export const removeComment = ({
  taskId,
  commentId,
}: {
  taskId: string;
  commentId: string;
}): RemoveCommentActionType => ({
  type: REMOVE_COMMENT,
  payload: {
    taskId,
    commentId,
  },
});

export const addFile = ({
  taskId,
  file,
}: {
  taskId: string;
  file: MyFile[];
}): AddFileActionType => ({
  type: ADD_FILE,
  payload: {
    taskId,
    file,
  },
});

export const removeFile = ({
  taskId,
  fileId,
}: {
  taskId: string;
  fileId: string;
}): RemoveFileActionType => ({
  type: REMOVE_FILE,
  payload: {
    taskId,
    fileId,
  },
});
