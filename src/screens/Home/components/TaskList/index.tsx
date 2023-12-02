import React from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { TaskCard } from "../TaskCard";

import * as S from "./styles";

import { TaskModel } from "../../../../models";

import { RouteNavigatorProps } from "../../../../routes/App.routes";
import { RootState } from "../../../../redux/store";

export const TaskList = () => {
  const { data: tasks } = useSelector((state: RootState) => state.tasks);
  const navigation = useNavigation<RouteNavigatorProps>();

  function navigateToTaskDetails(taskId: string) {
    navigation.navigate("TaskForm", { taskId });
  }

  function renderTaskCard({ item }: { item: TaskModel }) {
    return <TaskCard data={item} onPressToSeeDetails={navigateToTaskDetails} />;
  }

  return (
    <>
      <S.Title>Tarefas para hoje</S.Title>
      <FlatList<TaskModel>
        keyExtractor={(item) => String(item.id)}
        data={tasks}
        renderItem={renderTaskCard}
      />
    </>
  );
};
