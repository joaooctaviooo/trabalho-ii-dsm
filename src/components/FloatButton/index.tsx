import React from "react";
import { TouchableOpacityProps } from "react-native";

import * as S from "./styles";

type FloatButtonProps = TouchableOpacityProps & {
  Icon: React.JSX.Element;
};

export const FloatButton = ({ Icon, ...rest }: FloatButtonProps) => {
  return <S.Button {...rest}>{Icon}</S.Button>;
};
