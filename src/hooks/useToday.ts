import { getPreviousDate, getTodaysDate } from "@/helpers/dateHelpers";
import { useEffect, useMemo, useState } from "react";

export const useToday = () => {
  const [updateDependency, setUpdateDependency] = useState(0);

  useEffect(() => {
    let timerId: number;

    const handleNextDay = () => {
      setUpdateDependency((prev) => prev + 1);
      timerId = setTimeout(handleNextDay, nextDay().getTime() - Date.now());
    };

    timerId = setTimeout(() => {
      handleNextDay();
    }, nextDay().getTime() - Date.now());

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  return useMemo(() => {
    console.log("Updating today");
    const today = getTodaysDate();
    const yesterday = getPreviousDate(today);
    let twoWeeksAgo = today;
    for (let i = 0; i < 10; i++) twoWeeksAgo = getPreviousDate(twoWeeksAgo);
    return { today, yesterday, twoWeeksAgo };
  }, [updateDependency]);
};

const nextDay = () => {
  const result = new Date();
  result.setDate(result.getDate() + 1);
  result.setHours(0);
  result.setMinutes(0);
  result.setSeconds(5);
  return result;
};
