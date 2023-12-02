import React, { PropsWithChildren } from "react";

import * as S from "./styles";

type FormFieldProps = {
  label: string;
  width?: string;
};

export const FormField = ({
  label,
  width,
  children
}: PropsWithChildren<FormFieldProps>) => {
  return (
    <S.FormField width={width}>
      <S.FormFieldLabel>{label}</S.FormFieldLabel>
      {children}
    </S.FormField>
  );
};
