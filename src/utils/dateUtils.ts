import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export const formatDate = (date: string): string => {
  const utcDate = toZonedTime(date, "UTC");
  return format(utcDate, "dd/MM/yyyy HH:mm");
};