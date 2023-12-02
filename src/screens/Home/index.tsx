import React, { useCallback, useEffect, useState, useMemo } from "react";
import { StatusBar, ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import * as S from "./styles";

import { TaskList, TaskTotal } from "./components";
import { DateSlider, FloatButton, Icon } from "../../components";
import { IconList } from "../../components/Icon";

import { RouteNavigatorProps } from "../../routes/App.routes";

import { DateFormat, formatDate } from "../../services/dateService";

import { TaskStatus } from "../../models/TaskModel";

import { ToastType, useToast } from "../../contexts/Toast/Toast.context";
import { getAllTasksByDate } from "../../services/taskService";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../../redux/tasks/task-slice";
import { RootState } from "../../redux/store";

export const HomeScreen = () => {
  const theme = useTheme();
  const { showToast } = useToast();

  const navigation = useNavigation<RouteNavigatorProps>();
  const dispatch = useDispatch();

  const { data: tasks, selectedDate } = useSelector(
    (state: RootState) => state.tasks
  );

  const [loading, setLoading] = useState(true);

  const { doneTasksTotal, pendingTasksTotal } = useMemo(() => {
    let doneTasksTotalCounter = 0;
    let pendingTasksTotalCounter = 0;

    tasks.forEach((task) => {
      if (task.status === TaskStatus.DONE) {
        doneTasksTotalCounter++;
      } else {
        pendingTasksTotalCounter++;
      }
    });

    return {
      pendingTasksTotal: pendingTasksTotalCounter,
      doneTasksTotal: doneTasksTotalCounter
    };
  }, [tasks]);

  function navigateToTaskFormScreen() {
    navigation.navigate("TaskForm", {});
  }

  function updateStatusBarColor() {
    StatusBar.setBackgroundColor(theme.colors.primary);
    StatusBar.setBarStyle("light-content");
  }

  async function handleLoadTasks(date: Date) {
    setLoading(true);

    try {
      const formattedDate = formatDate(
        date,
        DateFormat.YEAR_HYPHEN_MONTH_NUM_HYPHEN_DATE_NUM
      );

      const loadedTasks = await getAllTasksByDate(formattedDate);

      dispatch(setTasks({ tasks: loadedTasks, tasksDate: date.toISOString() }));
    } catch (error) {
      showToast({
        message: "Erro ao carregar tarefas",
        type: ToastType.ERROR
      });
    }

    setLoading(false);
  }

  function handleChangeSelectedDate(date: Date) {
    handleLoadTasks(date);
  }

  const handleLoadTasksOnFocusScreen = useCallback(() => {
    const date = new Date(selectedDate);
    handleLoadTasks(date);
  }, [selectedDate]);

  useEffect(() => {
    updateStatusBarColor();
  }, []);

  useFocusEffect(handleLoadTasksOnFocusScreen);

  return (
    <>
      {loading ? (
        <S.LoadingContainer>
          <ActivityIndicator color={theme.colors.primary} size={"large"} />
        </S.LoadingContainer>
      ) : (
        <S.Container>
          <S.ContentContainer>
            <DateSlider
              date={new Date(selectedDate)}
              disabled={loading}
              onChangeDate={handleChangeSelectedDate}
            />

            <S.TaskCounters>
              <TaskTotal
                label="Tarefas Concluídas"
                accentColor={theme.colors.successLight}
                primaryColor={theme.colors.success}
                Icon={
                  <Icon
                    icon={IconList.checkCicle}
                    color={theme.colors.success}
                    size={30}
                  />
                }
                total={doneTasksTotal}
              />

              <TaskTotal
                label="Tarefas Pendentes"
                accentColor={theme.colors.alertLight}
                primaryColor={theme.colors.alert}
                Icon={
                  <Icon
                    icon={IconList.alertCircle}
                    color={theme.colors.alert}
                    size={34}
                  />
                }
                total={pendingTasksTotal}
              />
            </S.TaskCounters>

            <TaskList />
          </S.ContentContainer>
        </S.Container>
      )}
      <FloatButton
        Icon={
          <Icon icon={IconList.plus} color={theme.colors.light} size={24} />
        }
        onPress={navigateToTaskFormScreen}
      />
    </>
  );
};
