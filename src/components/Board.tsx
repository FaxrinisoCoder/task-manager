import Column from "./Column";
import type { Task } from "../types/task";

interface BoardProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const Board = ({ tasks, onDelete, onEdit }: BoardProps) => {
  return (
    <section className="grid gap-6 xl:grid-cols-3">
      <Column
        title="Todo"
        status="todo"
        tasks={tasks}
        onDelete={onDelete}
        onEdit={onEdit}
      />
      <Column
        title="Doing"
        status="doing"
        tasks={tasks}
        onDelete={onDelete}
        onEdit={onEdit}
      />
      <Column
        title="Done"
        status="done"
        tasks={tasks}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </section>
  );
};

export default Board;
