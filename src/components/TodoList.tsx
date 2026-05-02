import { useState } from "react";
import TodoItem from "./Todoitem";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  const addTodo = () => {
    if (!text.trim()) return;

    setTodos([
      ...todos,
      { id: Date.now(), title: text, completed: false },
    ]);

    setText("");
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return (
    <div
      style={{
        marginTop: "40px",
        width: "420px",
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Задача 3 — Todo List</h2>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="Новая задача..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={addTodo}
          style={{
            background: "#1677ff",
            color: "#fff",
            border: "none",
            padding: "0 16px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Добавить
        </button>
      </div>

      <div style={{ marginTop: "15px" }}>
        {todos.length === 0 ? (
          <p style={{ color: "#999" }}>Нет задач</p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TodoList;