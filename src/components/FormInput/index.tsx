import React from "react";
import { Text, TextInputProps } from "react-native";

import * as S from "./styles";

type FormFieldProps = TextInputProps & {
  type?: "TEXTAREA" | "INPUT";
  minHeight?: number;
};

export const FormInput = ({
  value,
  type = "INPUT",
  ...rest
}: FormFieldProps) => {
  if (type === "TEXTAREA") {
    return (
      <S.Input {...rest}>
        <Text>{value}</Text>
      </S.Input>
    );
  }

  return <S.Input {...rest} value={value} />;
};
