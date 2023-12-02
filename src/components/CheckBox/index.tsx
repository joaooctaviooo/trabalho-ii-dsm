import React from "react";
import { TouchableOpacityProps } from "react-native";
import { useTheme } from "styled-components";

import * as S from "./styles";

import { Icon, IconList } from "../Icon";

type CheckBoxProps = TouchableOpacityProps & {
  checked?: boolean;
};

export const CheckBox = ({ checked, ...rest }: CheckBoxProps) => {
  const theme = useTheme();

  return (
    <S.CheckButton {...rest}>
      {checked ? (
        <Icon
          icon={IconList.checkSquare}
          color={theme.colors.success}
          size={22}
        />
      ) : (
        <Icon
          icon={IconList.square}
          color={theme.colors.accentText}
          size={22}
        />
      )}
    </S.CheckButton>
  );
};
