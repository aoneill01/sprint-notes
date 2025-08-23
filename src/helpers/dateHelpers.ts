export const getTodaysDate = () => {
  const today = new Date();
  return convertToWeekday(
    new Date(today.getTime() - today.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0]
  );
};

export const getPreviousDate = (date: string) => {
  const d = stringToDate(date);

  d.setDate(d.getDate() - 1);
  return convertToWeekday(
    new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0]
  );
};

export const isBetween = (date: string, start: string, end: string) => {
  // Assume these are in yyyy-mm-dd format, so we can string compare
  return date >= start && date <= end;
};

const convertToWeekday = (date: string) => {
  const d = stringToDate(date);
  if (d.getDay() === 0 || d.getDay() === 6) {
    return convertToWeekday(getPreviousDate(date));
  }
  return date;
};

const stringToDate = (date: string) =>
  new Date(new Date(date).getTime() + new Date().getTimezoneOffset() * 60000);
