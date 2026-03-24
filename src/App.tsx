import { useEffect, useState } from "react";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import Navbar from "./components/Navbar";
import Board from "./components/Board";
import TaskForm from "./components/TaskForm";
import { initialTasks } from "./data/initialTasks";
import type { Task, TaskStatus } from "./types/task";
import {
  getTasksFromStorage,
  getThemeFromStorage,
  saveTasksToStorage,
  saveThemeToStorage,
} from "./utils/localStorage";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const savedTasks = getTasksFromStorage();
    const savedTheme = getThemeFromStorage();

    setTasks(savedTasks || initialTasks);
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  useEffect(() => {
    saveThemeToStorage(theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const addTask = (newTask: Task) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const startEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
    setEditingTask(null);
  };

  const clearEditingTask = () => {
    setEditingTask(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeTaskId = active.id as string;
    const newStatus = over.id as TaskStatus;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === activeTaskId ? { ...task, status: newStatus } : task,
      ),
    );
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 text-slate-900 transition-colors dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-white">
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <TaskForm
              onAddTask={addTask}
              editingTask={editingTask}
              onUpdateTask={updateTask}
              clearEditingTask={clearEditingTask}
            />
          </div>

          <Board tasks={tasks} onDelete={deleteTask} onEdit={startEditTask} />
        </main>
      </div>
    </DndContext>
  );
}

export default App;
