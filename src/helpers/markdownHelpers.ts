export const transformDescription = (description: string) => {
  const jiraRegex = /cldycon-\d+/gi;
  return description.replaceAll(
    jiraRegex,
    (match) =>
      `[${match}](https://apptio.atlassian.net/browse/${match.toUpperCase()})`
  );
};
