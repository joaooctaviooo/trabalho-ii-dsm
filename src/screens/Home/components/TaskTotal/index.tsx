import React from "react";

import * as S from "./styles";

type TaskTotalProps = {
  label: string;
  total: number;
  primaryColor: string;
  accentColor: string;
  Icon: JSX.Element;
};

export const TaskTotal = ({
  label,
  total,
  primaryColor,
  accentColor,
  Icon
}: TaskTotalProps) => {
  return (
    <S.Container background={accentColor}>
      {Icon}

      <S.ContentContainer>
        <S.Label color={primaryColor}>{label}</S.Label>
        <S.TaskTotal color={primaryColor}>{total}</S.TaskTotal>
      </S.ContentContainer>
    </S.Container>
  );
};
