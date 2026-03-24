import { FaTrash, FaPen, FaCalendarAlt } from "react-icons/fa";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { Task, TaskPriority } from "../types/task";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const priorityColors: Record<TaskPriority, string> = {
  low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  medium:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  high: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
};

const TaskCard = ({ task, onDelete, onEdit }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
      data: {
        task,
      },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="cursor-grab rounded-3xl border border-slate-200 bg-white p-5 shadow-md transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800 active:cursor-grabbing"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          {task.title}
        </h3>

        <div
          className="flex items-center gap-2"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => onEdit(task)}
            className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <FaPen />
          </button>

          <button
            onClick={() => onDelete(task.id)}
            className="rounded-xl border border-red-200 p-2 text-red-600 transition hover:bg-red-50 dark:border-red-900/40 dark:text-red-400 dark:hover:bg-red-950/30"
          >
            <FaTrash />
          </button>
        </div>
      </div>

      <p className="mb-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {task.description}
      </p>

      <div className="flex items-center justify-between gap-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${priorityColors[task.priority]}`}
        >
          {task.priority}
        </span>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <FaCalendarAlt />
          <span>{task.deadline}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
