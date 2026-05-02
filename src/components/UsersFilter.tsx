import { useEffect, useState } from "react";

type User = { id: number; name: string };

const users: User[] = [
  { id: 1, name: "Aruzhan" },
  { id: 2, name: "Dias" },
  { id: 3, name: "Alina" },
  { id: 4, name: "Arman" },
  { id: 5, name: "Dana" },
];

// 🔍 fuzzy match
function fuzzyMatch(text: string, query: string) {
  const t = text.toLowerCase();
  const q = query.toLowerCase();

  let ti = 0;
  let qi = 0;

  while (ti < t.length && qi < q.length) {
    if (t[ti] === q[qi]) qi++;
    ti++;
  }

  return qi === q.length;
}

// ⭐ score (сортировка)
function getScore(text: string, query: string) {
  const t = text.toLowerCase();
  const q = query.toLowerCase();

  let score = 0;
  let lastIndex = -1;

  for (let char of q) {
    const index = t.indexOf(char, lastIndex + 1);
    if (index === -1) return -1;

    score += index === lastIndex + 1 ? 2 : 1;
    lastIndex = index;
  }

  return score;
}

// ✨ highlight (умный)
function highlightText(text: string, query: string) {
  if (!query) return text;

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();

  const index = lowerText.indexOf(lowerQuery);

  // подряд совпадение
  if (index !== -1) {
    const before = text.slice(0, index);
    const match = text.slice(index, index + query.length);
    const after = text.slice(index + query.length);

    return (
      <>
        {before}
        <span style={{ background: "#ffd54f", borderRadius: "3px" }}>
          {match}
        </span>
        {after}
      </>
    );
  }

  // fallback fuzzy
  let qi = 0;

  return text.split("").map((char, i) => {
    if (qi < lowerQuery.length && char.toLowerCase() === lowerQuery[qi]) {
      qi++;
      return (
        <span key={i} style={{ background: "#ffd54f" }}>
          {char}
        </span>
      );
    }
    return char;
  });
}

function UsersFilter() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  // debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setActiveIndex(0); // сброс при новом поиске
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const filteredUsers = users
    .filter((user) => fuzzyMatch(user.name, debouncedSearch))
    .sort(
      (a, b) =>
        getScore(b.name, debouncedSearch) -
        getScore(a.name, debouncedSearch)
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
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            setActiveIndex((prev) =>
              prev < filteredUsers.length - 1 ? prev + 1 : 0
            );
          }

          if (e.key === "ArrowUp") {
            setActiveIndex((prev) =>
              prev > 0 ? prev - 1 : filteredUsers.length - 1
            );
          }

          if (e.key === "Enter") {
            const selected = filteredUsers[activeIndex];
            if (selected) {
              setSearch(selected.name);
              alert(`Вы выбрали: ${selected.name}`);
            }
          }
        }}
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
          {filteredUsers.map((user, index) => (
            <li
              key={user.id}
              style={{
                padding: "10px",
                borderRadius: "6px",
                marginBottom: "6px",
                background:
                  activeIndex === index ? "#e6f4ff" : "#f5f5f5",
                cursor: "pointer",
                transition: "0.2s",
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => {
                setSearch(user.name);
                alert(`Вы выбрали: ${user.name}`);
              }}
            >
              {highlightText(user.name, debouncedSearch)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UsersFilter;