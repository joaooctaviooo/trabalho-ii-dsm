import React, { useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { useTheme } from "styled-components";

import * as dateService from "../../services/dateService";

import * as S from "./styles";

import { Icon, IconList } from "../Icon";

type DateSliderProps = {
  date: Date;
  disabled?: boolean;
  onChangeDate: (date: Date) => void;
};

export const DateSlider = ({
  date,
  disabled,
  onChangeDate
}: DateSliderProps) => {
  const theme = useTheme();

  const label = useMemo(() => {
    const currentDate = new Date();

    const formattedCurrentDate = dateService.formatDate(
      currentDate,
      dateService.DateFormat.DATE_NUM_SLASH_MONTH_NUM_SLASH_YEAR
    );

    const formattedDate = dateService.formatDate(
      date,
      dateService.DateFormat.DATE_NUM_SLASH_MONTH_NUM_SLASH_YEAR
    );

    if (formattedCurrentDate === formattedDate) {
      return "Hoje";
    }

    return dateService.formatDate(date, dateService.DateFormat.HUMAN);
  }, [date]);

  function handleGoToPreviousDay() {
    const previousDate = dateService.subtractTime(date, { days: 1 });
    onChangeDate(previousDate);
  }

  function handleGoToNextDay() {
    const nextDay = dateService.addTime(date, { days: 1 });
    onChangeDate(nextDay);
  }

  return (
    <S.Container>
      <TouchableOpacity disabled={disabled} onPress={handleGoToPreviousDay}>
        <Icon icon={IconList.chevronLeft} color={theme.colors.text} size={22} />
      </TouchableOpacity>

      <S.Title>{label}</S.Title>

      <TouchableOpacity disabled={disabled} onPress={handleGoToNextDay}>
        <Icon
          icon={IconList.chevronRight}
          color={theme.colors.text}
          size={22}
        />
      </TouchableOpacity>
    </S.Container>
  );
};
