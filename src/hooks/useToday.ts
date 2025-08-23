import { getPreviousDate, getTodaysDate } from "@/helpers/dateHelpers";
import { useMemo } from "react";

export const useToday = () => {
  // TODO: Detect day changes?
  return useMemo(() => {
    const today = getTodaysDate();
    const yesterday = getPreviousDate(today);
    let twoWeeksAgo = today;
    for (let i = 0; i < 10; i++) twoWeeksAgo = getPreviousDate(twoWeeksAgo);
    return { today, yesterday, twoWeeksAgo };
  }, []);
};
