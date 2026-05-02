import type { Todo } from "./TodoList";

type Props = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px",
        borderRadius: "8px",
        background: "#f9f9f9",
        marginBottom: "8px",
        transition: "0.2s",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />

        <span
          style={{
            textDecoration: todo.completed ? "line-through" : "none",
            color: todo.completed ? "#999" : "#000",
          }}
        >
          {todo.title}
        </span>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        style={{
          background: "#ff4d4f",
          border: "none",
          color: "#fff",
          borderRadius: "6px",
          padding: "4px 8px",
          cursor: "pointer",
        }}
      >
        ✕
      </button>
    </div>
  );
}

export default TodoItem;