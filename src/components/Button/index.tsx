import React from "react";
import { TouchableOpacityProps, ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

import * as S from "./styles";

type ButtonProps = TouchableOpacityProps & {
  label: string;
  color: string;
  loading?: boolean;
  width?: string;
};

export const Button = ({
  label,
  color,
  loading,
  width = "100%",
  ...rest
}: ButtonProps) => {
  const theme = useTheme();

  return (
    <S.Button backgroundColor={color} width={width} {...rest}>
      {loading ? (
        <ActivityIndicator size={"small"} color={theme.colors.light} />
      ) : (
        <S.Label>{label}</S.Label>
      )}
    </S.Button>
  );
};
