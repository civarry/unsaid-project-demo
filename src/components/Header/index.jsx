import todoLogo from "../../assets/Logo.png";
import { AiOutlinePlusCircle } from "react-icons/ai";
import styles from "./header.module.css";
import { useState } from "react";

export function Header({ onAddTask, onSearch }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  function handleSubmit(event) {
    event.preventDefault();

    if (title.trim() === "") {
      // Show an error message or perform any desired action
      alert("Title cannot be empty");
      return;
    }

    if (description.trim() === "") {
      // Show an error message or perform any desired action
      alert("Description cannot be empty");
      return;
    }

    if (title.length < 2) {
      // Show an error message or perform any desired action
      alert("Title must be at least 2 characters long");
      return;
    }

    if (description.length < 10) {
      // Show an error message or perform any desired action
      alert("Description must be at least 10 characters long");
      return;
    }

    onAddTask(title, description);
    setTitle("");
    setDescription("");
    setCharacterCount(0);
  }

  function onChangeTitle(event) {
    const text = event.target.value;
    if (text.length <= 18) {
      setTitle(event.target.value);
    }
  }

  function onChangeDescription(event) {
    const text = event.target.value;
    if (text.length <= 200) {
      setDescription(text);
      setCharacterCount(text.length);
    }
  }

  return (
    <header className={styles.header}>
      <form onSubmit={handleSubmit} className={styles.newTaskForm}>
        <div className={styles.formHeader}>
          <input
            id="title"
            placeholder="Message to..."
            type="text"
            value={title}
            onChange={onChangeTitle}
          />
          <button className={styles.addButton}>
            <AiOutlinePlusCircle size={20} />
          </button>
        </div>
        <div className={styles.formTextArea}>
          <textarea
            id="description"
            placeholder="Write your message here..."
            type="text"
            value={description}
            onChange={onChangeDescription}
            maxLength={200}
          />
          <div className={styles.characterCounter}>
            {characterCount} / 200 characters
          </div>
        </div>
      </form>
    </header>
  );
}
