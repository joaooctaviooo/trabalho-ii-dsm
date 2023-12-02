import firestore from "@react-native-firebase/firestore";

import { TaskModel } from "../models";
import { TaskStatus } from "../models/TaskModel";

type FirebaseTaskModel = {
  title: string;
  description: string;
  date: string;
  status: TaskStatus;
};

export async function getAllTasksByDate(date: string): Promise<TaskModel[]> {
  const taskDocs = await firestore()
    .collection<FirebaseTaskModel>("tasks")
    .where("date", "==", date)
    .get();

  const tasks: TaskModel[] = taskDocs.docs.map((taskDocument) => {
    const taskData = taskDocument.data();

    return {
      id: taskDocument.id,
      title: taskData.title,
      description: taskData.description,
      date: taskData.date,
      status: taskData.status
    };
  });

  return tasks;
}

export async function createTask(
  input: Omit<TaskModel, "id" | "status">
): Promise<TaskModel> {
  const { title, description, date } = input;
  const createdTaskReference = await firestore().collection("tasks").add({
    title,
    description,
    date,
    status: TaskStatus.PENDING
  });

  return {
    id: createdTaskReference.id,
    title,
    description,
    date,
    status: TaskStatus.PENDING
  };
}

export async function updateTask(input: TaskModel): Promise<void> {
  const { id, title, description, date, status } = input;

  await firestore().collection("tasks").doc(id).update({
    title,
    description,
    date,
    status: status
  });
}

export async function updateTaskStatus(taskId: string, status: TaskStatus) {
  await firestore().collection("tasks").doc(taskId).update({
    status: status
  });
}

export async function deleteTask(id: string): Promise<void> {
  await firestore().collection("tasks").doc(id).delete();
}
