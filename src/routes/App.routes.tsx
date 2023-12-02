import React from "react";
import { NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "styled-components";

import { HomeScreen } from "../screens/Home";
import { TaskFormScreen } from "../screens/TaskForm";

export type AppStackNavigatorParamList = {
  Home: undefined;
  TaskForm: { taskId?: string };
};

export type RouteNavigatorProps = NavigationProp<AppStackNavigatorParamList>;

const StackNavigator = createNativeStackNavigator<AppStackNavigatorParamList>();

export const AppRoutes = () => {
  const theme = useTheme();

  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary
        },
        headerTintColor: theme.colors.light,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 16,
          fontWeight: "bold"
        }
      }}>
      <StackNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Minhas Atividades" }}
      />

      <StackNavigator.Screen
        name="TaskForm"
        component={TaskFormScreen}
        options={(props) => {
          return {
            title: props.route.params?.taskId
              ? "Detalhes da Tarefa"
              : "Cadastrar Tarefa"
          };
        }}
      />
    </StackNavigator.Navigator>
  );
};
