import React from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { BaseToast, ErrorToast } from "react-native-toast-message";
import { theme } from "../../global";

const titleStyle: StyleProp<TextStyle> = {
  fontSize: 15,
  fontWeight: "400"
};

const descriptionStyle: StyleProp<TextStyle> = {
  fontSize: 14,
  fontWeight: "400"
};

const TOAST_WIDTH = "90%";

const successToastStyle: StyleProp<ViewStyle> = {
  borderLeftColor: theme.colors.success,
  width: TOAST_WIDTH
};

const errorToastStyle: StyleProp<ViewStyle> = {
  borderLeftColor: theme.colors.danger,
  width: TOAST_WIDTH
};

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={successToastStyle}
      text1Style={titleStyle}
      text2Style={descriptionStyle}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      style={errorToastStyle}
      text1Style={titleStyle}
      text2Style={descriptionStyle}
    />
  )
};
