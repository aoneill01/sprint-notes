import { createFileRoute } from "@tanstack/react-router";
import { Column, Grid } from "@carbon/react";
import Todo, { type Task } from "@/components/Todo/Todo";
import { useToday } from "@/hooks/useToday";
import { useCallback } from "react";
import { isBetween } from "@/helpers/dateHelpers";
import { useNotes } from "@/hooks/useNotes";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { today, yesterday } = useToday();

  const todaySelector = useCallback(
    (note: Task) => note.date === today,
    [today]
  );

  const {
    notes: todaysTasks,
    addNote: addTodaysNote,
    deleteNote: deleteTodaysNote,
    updateNote: updateTodaysNote,
  } = useNotes<Task>("task", todaySelector);

  const yesterdaySelector = useCallback(
    (note: Task) => note.date === yesterday,
    [yesterday]
  );

  const {
    notes: yesterdaysTasks,
    addNote: addYesterdaysTask,
    deleteNote: deleteYesterdaysTask,
    updateNote: updateYesterdaysTask,
  } = useNotes<Task>("task", yesterdaySelector);

  const infoSelector = useCallback(
    (note: Task) => isBetween(note.date, yesterday, today),
    [today, yesterday]
  );

  const {
    notes: infos,
    addNote: addInfo,
    deleteNote: deleteInfo,
    updateNote: updateInfo,
  } = useNotes<Task>("info", infoSelector);

  return (
    <Grid fullWidth>
      <Column lg={16} md={8} sm={4}>
        <h2>Today I will...</h2>
        <Todo
          tasks={todaysTasks}
          newDate={today}
          onAddTask={addTodaysNote}
          onDeleteTask={deleteTodaysNote}
          onUpdateTask={updateTodaysNote}
        />
        <h2>Yesterday I...</h2>
        <Todo
          tasks={yesterdaysTasks}
          newDate={yesterday}
          onAddTask={addYesterdaysTask}
          onDeleteTask={deleteYesterdaysTask}
          onUpdateTask={updateYesterdaysTask}
        />
        <h2>Blockers, Information-Radiators, & Meet-Afters</h2>
        <Todo
          tasks={infos}
          newDate={today}
          onAddTask={addInfo}
          onDeleteTask={deleteInfo}
          onUpdateTask={updateInfo}
        />
      </Column>
    </Grid>
  );
}
