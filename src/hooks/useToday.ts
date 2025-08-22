import { getPreviousDate, getTodaysDate } from "@/helpers/dateHelpers";
import { useMemo } from "react";

export const useToday = () => {
  // TODO: Detect day changes?
  return useMemo(() => {
    const today = getTodaysDate();
    const yesterday = getPreviousDate(today);
    return { today, yesterday };
  }, []);
};
