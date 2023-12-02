export enum TaskStatus {
  DONE = "DONE",
  PENDING = "PENDING"
}

export type TaskModel = {
  id: string;
  title: string;
  description: string;
  date: string;
  status: TaskStatus;
};
