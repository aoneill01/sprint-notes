import type { Task } from "@/components/Todo/Todo";
import { useEffect, useState } from "react";

export const useTasks = (type: string, date: string) => {
  const key = `${type}-${date}`;

  const loadFromStorage = () => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue) as Task[];
    }
    return [];
  };

  const [tasks, setTasks] = useState<Task[]>(loadFromStorage);

  useEffect(() => {
    setTasks(loadFromStorage);
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (description: string) => {
    setTasks((prev) => [
      {
        id: new Date().getTime().toString(),
        completed: false,
        description,
        date,
      },
      ...prev,
    ]);
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleUpdateTask = (task: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
  };

  return { tasks, handleUpdateTask, handleDeleteTask, handleAddTask };
};
