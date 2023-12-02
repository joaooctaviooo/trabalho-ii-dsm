import { add, format, Duration as DateFnsDuration, sub } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import { ptBR } from "date-fns/locale";

export enum DateFormat {
  DATE_NUM_SLASH_MONTH_NUM_SLASH_YEAR = "dd/MM/yyyy",
  YEAR_HYPHEN_MONTH_NUM_HYPHEN_DATE_NUM = "yyyy-MM-dd",
  HUMAN = "eeee, dd 'de' MMM 'de' yyyy"
}

type Duration = {
  seconds?: number;
  minutes?: number;
  hours?: number;
  days?: number;
  months?: number;
  years?: number;
};

type LibDurationMap = {
  [key in keyof Duration]: keyof DateFnsDuration;
};

const timeDurationMap: LibDurationMap = {
  seconds: "seconds",
  minutes: "minutes",
  hours: "hours",
  days: "days",
  months: "months",
  years: "years"
};

export function instanciateDateInCurrentTimezone(date: string) {
  const utcDate = zonedTimeToUtc(date, "America/Sao_Paulo");
  return utcDate;
}

export function formatDate(date: Date, outputFormat: DateFormat) {
  return format(date, outputFormat, { locale: ptBR });
}

export function addTime(date: Date, duration: Duration) {
  const libDuration = convertDurationObjectToLibDurationObject(duration);
  return add(date, libDuration);
}

export function subtractTime(date: Date, duration: Duration) {
  const libDuration = convertDurationObjectToLibDurationObject(duration);
  return sub(date, libDuration);
}

function convertDurationObjectToLibDurationObject(duration: Duration) {
  let libDuration: DateFnsDuration = {} as DateFnsDuration;

  Object.keys(duration).forEach((key) => {
    const durationKey = key as keyof Duration;

    const libDurationKey = timeDurationMap[durationKey]!;
    libDuration[libDurationKey] = duration[durationKey];
  });

  return libDuration;
}
