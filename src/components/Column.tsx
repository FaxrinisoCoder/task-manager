import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import type { Task, TaskStatus } from "../types/task";

interface ColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const columnColors: Record<TaskStatus, string> = {
  todo: "bg-gradient-to-r from-sky-500 to-cyan-500",
  doing: "bg-gradient-to-r from-amber-500 to-orange-500",
  done: "bg-gradient-to-r from-emerald-500 to-green-500",
};

const Column = ({ title, status, tasks, onDelete, onEdit }: ColumnProps) => {
  const filteredTasks = tasks.filter((task) => task.status === status);

  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className={`rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-lg backdrop-blur transition dark:border-slate-800 dark:bg-slate-900/70 ${
        isOver ? "ring-2 ring-slate-400 dark:ring-slate-500" : ""
      }`}
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <div
            className={`mb-2 h-2 w-20 rounded-full ${columnColors[status]}`}
          />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {title}
          </h2>
        </div>

        <span className="rounded-2xl bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          {filteredTasks.length}
        </span>
      </div>

      <div className="space-y-4 min-h-[200px]">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-400">
            No tasks here yet
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;
