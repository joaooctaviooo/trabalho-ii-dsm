import React, { createContext, PropsWithChildren, useContext } from "react";
import Toast from "react-native-toast-message";
import { toastConfig } from "./toastConfig";

export enum ToastType {
  "SUCCESS" = "SUCCESS",
  "ERROR" = "ERROR",
  "WARNING" = "WARNING"
}

type ToastTypeMap = {
  [key in ToastType]: string;
};

const toastTypeToLibTypeMap: ToastTypeMap = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning"
};

type ShowToastFnParams = {
  type: ToastType;
  message: string;
  description?: string;
};

type ToastContextData = {
  showToast(params: ShowToastFnParams): void;
};

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider = ({ children }: PropsWithChildren) => {
  function showToast(params: ShowToastFnParams) {
    const { type, message, description } = params;

    Toast.show({
      type: toastTypeToLibTypeMap[type],
      text1: message,
      text2: description,
      position: "bottom"
    });
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast config={toastConfig} />
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextData {
  const contextData = useContext(ToastContext);

  return { ...contextData };
}
