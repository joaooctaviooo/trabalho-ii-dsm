import React from "react";
import { NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "styled-components";

import { LoginScreen } from "../screens/Login";

export type AuthStackNavigatorParamList = {
  Login: undefined;
};

export type RouteNavigatorProps = NavigationProp<AuthStackNavigatorParamList>;

const StackNavigator =
  createNativeStackNavigator<AuthStackNavigatorParamList>();

export const AuthRoutes = () => {
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
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </StackNavigator.Navigator>
  );
};
