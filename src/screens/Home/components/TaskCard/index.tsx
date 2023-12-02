import React, { useState } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { useTheme } from "styled-components";

import { TaskModel } from "../../../../models";
import * as S from "./styles";

import { CheckBox, Icon } from "../../../../components";
import { IconList } from "../../../../components/Icon";

import { TaskStatus } from "../../../../models/TaskModel";

import { ToastType, useToast } from "../../../../contexts/Toast/Toast.context";

import * as taskService from "../../../../services/taskService";

import { updateTaskStatus as updateTaskStatusAction } from "../../../../redux/tasks/task-slice";
import { useDispatch } from "react-redux";

type TaskCardProps = {
  data: TaskModel;
  onPressToSeeDetails: (taskId: string) => void;
};

export const TaskCard = ({
  data: task,
  onPressToSeeDetails
}: TaskCardProps) => {
  const theme = useTheme();
  const { showToast } = useToast();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  function handleSeeDetails() {
    onPressToSeeDetails(task.id);
  }

  async function handleUpdateTaskStatus() {
    setLoading(true);

    try {
      const newStatus =
        task.status === TaskStatus.DONE ? TaskStatus.PENDING : TaskStatus.DONE;
      await taskService.updateTaskStatus(task.id, newStatus);

      dispatch(updateTaskStatusAction({ taskId: task.id, status: newStatus }));
    } catch (error) {
      showToast({
        type: ToastType.ERROR,
        message: "Erro ao atualizar status da tarefa"
      });
    }

    setLoading(false);
  }

  return (
    <S.Card>
      <S.CardMarker
        color={
          task.status === TaskStatus.DONE
            ? theme.colors.success
            : theme.colors.alert
        }
      />

      <S.CardContent>
        <S.CardInfo onPress={handleUpdateTaskStatus} disabled={loading}>
          {loading ? (
            <ActivityIndicator
              size={22}
              color={
                task.status === TaskStatus.DONE
                  ? theme.colors.success
                  : theme.colors.alert
              }
            />
          ) : (
            <CheckBox
              onPress={handleUpdateTaskStatus}
              checked={task.status === TaskStatus.DONE}
              disabled={loading}
            />
          )}

          <S.Title>{task.title}</S.Title>
        </S.CardInfo>

        <TouchableOpacity hitSlop={10} onPress={handleSeeDetails}>
          <Icon
            icon={IconList.chevronRight}
            color={theme.colors.text}
            size={20}
          />
        </TouchableOpacity>
      </S.CardContent>
    </S.Card>
  );
};
