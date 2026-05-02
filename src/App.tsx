import Button from "./components/Button";
import UsersFilter from "./components/UsersFilter";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div   style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px",
    background: "#f4f6f8",
    minHeight: "100vh",
  }}
>
      <h1>Мини приложение</h1>

      <h2>Задача 1 — Button</h2>

      <Button onClick={() => alert("Кнопка успешно нажата ✅")}>
        Click me
      </Button>

      <br /><br />

      <Button onClick={() => alert("не сработает")} disabled>
  Disabled
</Button>
      <UsersFilter />
<TodoList />
    </div>
  );
}

export default App;