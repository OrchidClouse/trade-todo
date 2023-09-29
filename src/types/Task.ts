export type Task = {
  id: string;
  title: string;
  description?: string;
  creationDate: Date;
  developmentStartTime?: Date;
  doneTime?: Date;
  priority: Priority;
  attachedFiles: MyFile[];
  status: Status;
  subtasks: Subtask[];
  comments: Comment[];
  projectId: string;
};

export enum Priority {
  Priority1,
  Priority2,
  Priority3,
  Priority4,
}

export type Status = 'queue' | 'development' | 'done';

export type Subtask = {
  id: string;
  title: string;
  status: boolean;
};

export type Comment = {
  id: string;
  text: string;
  parentId?: string;
};

export type MyFile = {
  id: string;
  name: string;
  size: number;
  type: string;
};
