import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { TaskModel } from "../../models";
import { TaskStatus } from "../../models/TaskModel";

export interface TaskState {
  selectedDate: string;
  data: TaskModel[];
}

export const INITIAL_STATE: TaskState = {
  selectedDate: new Date().toISOString(),
  data: []
};

export const TaskSlice = createSlice({
  name: "task",
  initialState: INITIAL_STATE,
  reducers: {
    setTasks: (
      state,
      action: PayloadAction<{ tasks: TaskModel[]; tasksDate: string }>
    ) => {
      state.data = action.payload.tasks;
      state.selectedDate = action.payload.tasksDate;
    },

    updateTaskStatus: (
      state,
      action: PayloadAction<{ taskId: string; status: TaskStatus }>
    ) => {
      const { status, taskId } = action.payload;

      state.data = state.data.map((task) => {
        if (task.id === taskId) {
          return { ...task, status };
        }

        return task;
      });
    }
  }
});

export const { setTasks, updateTaskStatus } = TaskSlice.actions;
export const taskReducer = TaskSlice.reducer;
