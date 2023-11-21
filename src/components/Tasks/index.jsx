import { Task } from "../Task";
import styles from "./tasks.module.css";
import { useState } from "react";

function SearchInput({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearchChange(event) {
    const query = event.target.value;
    setSearchQuery(query);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      onSearch(searchQuery);
    }
  }

  function handleSearch() {
    onSearch(searchQuery);
  }

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.search}
        type="text"
        placeholder="Search for keywords..."
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
      />
      <button className={styles.queryButton} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export function Tasks({ tasks, onDelete, onSearch, isAdmin }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  const taskQuantity = tasks.length;

  function handleSearch(query) {
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredTasks([]);
    } else {
      const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTasks(filteredTasks);
    }
  }

  const displayTasks = searchQuery ? filteredTasks : tasks;

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
        {displayTasks.length === 0 && searchQuery !== "" ? (
          <div className={styles.noRecords}>
            No records found for "{searchQuery}".
          </div>
        ) : (
          displayTasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onDelete={onDelete}
              isAdmin={isAdmin}
            />
          ))
        )}
        {displayTasks.length === 0 && searchQuery === ""}
      </div>
    </section>
  );
}
