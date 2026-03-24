import type { Task } from "../types/task";

const TASKS_KEY = "task-manager-tasks";
const THEME_KEY = "task-manager-theme";

export const saveTasksToStorage = (tasks: Task[]) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

export const getTasksFromStorage = (): Task[] | null => {
  const data = localStorage.getItem(TASKS_KEY);
  return data ? JSON.parse(data) : null;
};

export const saveThemeToStorage = (theme: "light" | "dark") => {
  localStorage.setItem(THEME_KEY, theme);
};

export const getThemeFromStorage = (): "light" | "dark" => {
  const data = localStorage.getItem(THEME_KEY);
  return data === "dark" ? "dark" : "light";
};
