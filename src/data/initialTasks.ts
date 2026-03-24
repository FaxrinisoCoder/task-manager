import type { Task } from "../types/task";

export const initialTasks: Task[] = [
  {
    id: "1",
    title: "Landing page design",
    description: "Create responsive landing page UI",
    status: "todo",
    priority: "high",
    deadline: "2026-03-28",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "API integration",
    description: "Connect frontend to fake API",
    status: "doing",
    priority: "medium",
    deadline: "2026-03-30",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Fix navbar styles",
    description: "Improve mobile navbar layout",
    status: "done",
    priority: "low",
    deadline: "2026-03-25",
    createdAt: new Date().toISOString(),
  },
];
