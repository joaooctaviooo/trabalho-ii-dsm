import React, { useCallback, useState } from "react";
import { useTheme } from "styled-components";
import DateTimePicker, {
  DateTimePickerEvent
} from "@react-native-community/datetimepicker";
import {
  useFocusEffect,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import { useSelector } from "react-redux";

import * as S from "./styles";

import { Button, FormField } from "../../components";
import { ToastType, useToast } from "../../contexts/Toast/Toast.context";
import { FormInput } from "../../components/FormInput";

import { validateTaskData } from "../../validation/tasks";

import {
  DateFormat,
  formatDate,
  instanciateDateInCurrentTimezone
} from "../../services/dateService";
import * as taskService from "../../services/taskService";

import { RootState } from "../../redux/store";

enum LoadingAction {
  DELETE = "DELETE",
  CREATE = "CREATE",
  UPDATE = "UPDATE"
}

type RouteParams = {
  taskId?: string;
};

export const TaskFormScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { showToast } = useToast();

  const route = useRoute();
  const routeParams = route.params as RouteParams;

  const { data: tasks } = useSelector((state: RootState) => state.tasks);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState({ action: "", processing: false });

  async function handleCreateTask() {
    showLoading(LoadingAction.CREATE);

    try {
      await validateFormData();

      const formattedDate = formatDate(
        selectedDate,
        DateFormat.YEAR_HYPHEN_MONTH_NUM_HYPHEN_DATE_NUM
      );

      await taskService.createTask({
        title,
        description,
        date: formattedDate
      });

      showToast({
        type: ToastType.SUCCESS,
        message: "Tarefa cadastrada com sucesso"
      });

      navigation.goBack();
    } catch (error) {
      const parsedError = error as Error;

      showToast({
        type: ToastType.ERROR,
        message: "Dados Inválidos",
        description: parsedError.message
      });
    }

    hideLoading();
  }

  async function handleUpdateTask() {
    showLoading(LoadingAction.UPDATE);

    try {
      await validateFormData();

      const formattedDate = formatDate(
        selectedDate,
        DateFormat.YEAR_HYPHEN_MONTH_NUM_HYPHEN_DATE_NUM
      );

      const task = getTaskById(routeParams.taskId!);

      await taskService.updateTask({
        id: routeParams.taskId!,
        title,
        description,
        date: formattedDate,
        status: task?.status!
      });

      showToast({
        type: ToastType.SUCCESS,
        message: "Tarefa atualizada com sucesso"
      });

      navigation.goBack();
    } catch (error) {
      showToast({
        type: ToastType.ERROR,
        message: "Erro ao atualizar tarefa"
      });
    }

    hideLoading();
  }

  function showLoading(loadingAction: LoadingAction) {
    setLoading({
      action: loadingAction,
      processing: true
    });
  }

  function hideLoading() {
    setLoading({
      action: "",
      processing: false
    });
  }

  async function validateFormData() {
    await validateTaskData({
      title,
      description,
      date: selectedDate.toString()
    });
  }

  function handleChangeSelectedDate(
    event: DateTimePickerEvent,
    date: Date | undefined
  ) {
    setShowDatePicker(false);

    if (date) {
      setSelectedDate(date);
    }
  }

  function handleToggleDatePickerVisibility() {
    setShowDatePicker((prevState) => !prevState);
  }

  function loadTaskDetails() {
    if (!routeParams.taskId) {
      setTitle("");
      setDescription("");
      setSelectedDate(new Date());

      return;
    }

    const task = getTaskById(routeParams.taskId);

    if (!task) {
      navigation.goBack();
      return;
    }

    setTitle(task.title);
    setDescription(task.description);

    const dateInCurrentTimezone = instanciateDateInCurrentTimezone(task.date);
    setSelectedDate(dateInCurrentTimezone);
  }

  async function handleDeleteTask() {
    showLoading(LoadingAction.DELETE);

    try {
      await taskService.deleteTask(routeParams.taskId!);

      showToast({
        type: ToastType.SUCCESS,
        message: "Tarefa deletada com sucesso"
      });

      navigation.goBack();
    } catch (error) {
      showToast({
        type: ToastType.ERROR,
        message: "Erro ao deletar tarefa"
      });
    }

    hideLoading();
  }

  function getTaskById(taskId: string) {
    return tasks.find((storedTask) => storedTask.id === taskId);
  }

  const loadTaskDetailsOnFocusScreen = useCallback(loadTaskDetails, [
    routeParams.taskId
  ]);

  useFocusEffect(loadTaskDetailsOnFocusScreen);

  return (
    <>
      <S.Container>
        <FormField label="Título">
          <FormInput
            placeholder="Informe o título aqui"
            value={title}
            onChangeText={(value) => setTitle(value)}
          />
        </FormField>

        <FormField label="Descrição">
          <FormInput
            placeholder="Informe a descrição da tarefa"
            multiline
            minHeight={160}
            textAlignVertical="top"
            type="TEXTAREA"
            value={description}
            onChangeText={(value) => setDescription(value)}
          />
        </FormField>

        <FormField label="Data da Tarefa">
          <S.SelectedDateContainer onPress={handleToggleDatePickerVisibility}>
            <S.SelectedDate>
              {formatDate(
                selectedDate,
                DateFormat.DATE_NUM_SLASH_MONTH_NUM_SLASH_YEAR
              )}
            </S.SelectedDate>
          </S.SelectedDateContainer>
        </FormField>

        {showDatePicker && (
          <DateTimePicker
            timeZoneName="America/Sao_Paulo"
            value={selectedDate}
            onChange={handleChangeSelectedDate}
          />
        )}

        <S.FormFooter>
          {routeParams.taskId ? (
            <>
              <Button
                loading={
                  loading.processing && loading.action === LoadingAction.UPDATE
                }
                label="Salvar"
                width="48%"
                color={theme.colors.primary}
                disabled={loading.processing}
                onPress={handleUpdateTask}
              />

              <Button
                loading={
                  loading.processing && loading.action === LoadingAction.DELETE
                }
                label="Remover"
                width="48%"
                color={theme.colors.danger}
                disabled={loading.processing}
                onPress={handleDeleteTask}
              />
            </>
          ) : (
            <Button
              onPress={handleCreateTask}
              label="Salvar"
              width="100%"
              color={theme.colors.primary}
              loading={
                loading.processing && loading.action === LoadingAction.CREATE
              }
              disabled={loading.processing}
            />
          )}
        </S.FormFooter>
      </S.Container>
    </>
  );
};
