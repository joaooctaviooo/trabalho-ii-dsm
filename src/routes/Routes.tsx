import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { RootState } from "../redux/store";

import { AppRoutes } from "./App.routes";
import { AuthRoutes } from "./Auth.routes";

export const Routes = () => {
  const { signed } = useSelector((state: RootState) => {
    return state.auth;
  });

  return (
    <NavigationContainer>
      {signed ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};
