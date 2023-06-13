import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";
import { Navbar } from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { app, db } from "./firebase-config";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { LoginForm } from "./components/Login";

const COLLECTION_NAME = "tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    loadSavedTasks();
    checkAdminStatus();
  }, []);

  async function loadSavedTasks() {
    try {
      const docRef = doc(db, COLLECTION_NAME, "tasks");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTasks(docSnap.data().tasks);
      }
    } catch (error) {
      console.error("Error loading tasks from Firestore:", error);
    }
  }

  async function setTasksAndSave(newTasks) {
    setTasks(newTasks);
    try {
      const docRef = doc(db, COLLECTION_NAME, "tasks");
      await setDoc(docRef, { tasks: newTasks });
      console.log("Tasks saved to Firestore");
    } catch (error) {
      console.error("Error saving tasks to Firestore:", error);
    }
  }

  function handleSearch(query) {
    setSearchQuery(query);
  }

  function addTask(taskTitle, taskDescription) {
    const newTask = {
      id: uuidv4(),
      title: taskTitle,
      description: taskDescription,
    };
    const updatedTasks = [newTask, ...tasks];
    setTasksAndSave(updatedTasks);
  }

  function deleteTaskById(taskId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmDelete) {
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasksAndSave(updatedTasks);
    }
  }

  function checkAdminStatus() {
    const storedAdminStatus = localStorage.getItem("isAdmin");
    if (storedAdminStatus === "true") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }

  function handleLogin(isAdminValue) {
    setIsAdmin(isAdminValue);
    localStorage.setItem("isAdmin", isAdminValue.toString());
  }

  function handleLogout() {
    setIsAdmin(false);
    localStorage.setItem("isAdmin", "false");
  }

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Tasks
                tasks={tasks.reverse()}
                onDelete={deleteTaskById}
                searchQuery={searchQuery}
                isAdmin={isAdmin}
              />
            }
          />
          <Route
            path="/add"
            element={<Header onAddTask={addTask} onSearch={handleSearch} />}
          />
          <Route
            path="/login"
            element={
              <LoginForm onLogin={handleLogin} onLogout={handleLogout} />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
