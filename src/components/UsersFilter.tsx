import { useEffect, useState } from "react";

type User = { id: number; name: string };

const users: User[] = [
  { id: 1, name: "Aruzhan" },
  { id: 2, name: "Dias" },
  { id: 3, name: "Alina" },
  { id: 4, name: "Arman" },
  { id: 5, name: "Dana" },
];

// подсветка текста
function highlight(text: string, query: string) {
  if (!query) return text;

  const parts = text.split(new RegExp(`(${query})`, "gi"));

  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={i} style={{ background: "#ffe58f" }}>
        {part}
      </span>
    ) : (
      part
    )
  );
}

function UsersFilter() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // фильтрация БЕЗ лишнего state
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div
      style={{
        marginTop: "40px",
        width: "400px",
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ marginBottom: "15px" }}>
        Задача 2 — Фильтр пользователей
      </h2>

      <input
        type="text"
        placeholder="🔍 Поиск пользователя..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          width: "100%",
          marginBottom: "15px",
          outline: "none",
        }}
      />

      {filteredUsers.length === 0 ? (
        <p style={{ color: "#999" }}>😔 Ничего не найдено</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              style={{
                padding: "10px",
                borderRadius: "6px",
                marginBottom: "6px",
                background: "#f5f5f5",
                transition: "0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#e6f4ff")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#f5f5f5")
              }
            >
              {highlight(user.name, debouncedSearch)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UsersFilter;