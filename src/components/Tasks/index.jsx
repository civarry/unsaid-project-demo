import { Task } from "../Task";
import styles from "./tasks.module.css";
import { useState } from "react";

function SearchInput({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearchChange(event) {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  }

  return (
    <input
      className={styles.search}
      type="text"
      placeholder="Search for keywords..."
      value={searchQuery}
      onChange={handleSearchChange}
    />
  );
}

export function Tasks({ tasks, onDelete, onSearch, isAdmin }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const taskQuantity = tasks.length;

  function handleSearch(query) {
    setSearchQuery(query);
  }

  return (
    <section className={styles.tasks}>
      <SearchInput onSearch={handleSearch} />
      <header className={styles.header}>
        <div>
          <p>Confession(s)</p>
          <span>{taskQuantity}</span>
        </div>
      </header>
      <div className={styles.list}>
        {filteredTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDelete={onDelete}
            isAdmin={isAdmin}
          />
        ))}
      </div>
    </section>
  );
}
