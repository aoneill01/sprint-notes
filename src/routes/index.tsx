import "../App.css";
import { createFileRoute } from "@tanstack/react-router";
import { Column, Grid } from "@carbon/react";
import Todo from "@/components/Todo/Todo";
import { useToday } from "@/hooks/useToday";
import { useTasks } from "@/hooks/useTasks";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { today, yesterday } = useToday();
  const {
    tasks: todaysTasks,
    handleUpdateTask: handleUpdateTaskToday,
    handleDeleteTask: handleDeleteTaskToday,
    handleAddTask: handleAddTaskToday,
  } = useTasks("task", today);
  const {
    tasks: yesterdaysTasks,
    handleUpdateTask: handleUpdateTaskYesterday,
    handleDeleteTask: handleDeleteTaskYesterday,
    handleAddTask: handleAddTaskYesterday,
  } = useTasks("task", yesterday);
  const {
    tasks: infoTasks,
    handleUpdateTask: handleUpdateTaskInfo,
    handleDeleteTask: handleDeleteTaskInfo,
    handleAddTask: handleAddTaskInfo,
  } = useTasks("info", today);

  return (
    <Grid fullWidth>
      <Column lg={16} md={8} sm={4}>
        <h2>Today I will...</h2>
        <Todo
          tasks={todaysTasks}
          onAddTask={handleAddTaskToday}
          onDeleteTask={handleDeleteTaskToday}
          onUpdateTask={handleUpdateTaskToday}
        />
        <h2>Yesterday I...</h2>
        <Todo
          tasks={yesterdaysTasks}
          onAddTask={handleAddTaskYesterday}
          onDeleteTask={handleDeleteTaskYesterday}
          onUpdateTask={handleUpdateTaskYesterday}
        />
        <h2>Blockers, Information-Radiators, & Meet-Afters</h2>
        <Todo
          tasks={infoTasks}
          onAddTask={handleAddTaskInfo}
          onDeleteTask={handleDeleteTaskInfo}
          onUpdateTask={handleUpdateTaskInfo}
        />
      </Column>
    </Grid>
  );
}
