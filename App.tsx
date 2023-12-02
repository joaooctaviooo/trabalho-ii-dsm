import React from "react";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";

import { theme } from "./src/global";

import { ToastProvider } from "./src/contexts/Toast/Toast.context";

import { store } from "./src/redux/store";
import { Routes } from "./src/routes/Routes";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <Provider store={store}>
          <Routes />
        </Provider>
      </ToastProvider>
    </ThemeProvider>
  );
};
