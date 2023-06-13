import React, { useState, useEffect } from "react";
import styles from "./login.module.css";

export function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check local storage for saved login state
    const savedLoginState = localStorage.getItem("isLoggedIn");
    if (savedLoginState === "true") {
      setIsLoggedIn(true);
      onLogin(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if entered credentials match admin credentials
    if (username === "unsaid" && password === "@@UnsaidFeelings") {
      setIsLoggedIn(true);
      onLogin(true);
      // Save login state to local storage
      localStorage.setItem("isLoggedIn", "true");
    } else {
      setIsLoggedIn(false);
      onLogin(false);
      // Remove login state from local storage
      localStorage.removeItem("isLoggedIn");
    }

    // Reset the form fields
    setUsername("");
    setPassword("");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    onLogin(false);
    // Remove login state from local storage
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login Form</h2>
      {isLoggedIn ? (
        <div>
          <p>You are logged in as an admin.</p>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <label>
            <input
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button className={styles.loginButton} type="submit">
            Login
          </button>
        </form>
      )}
    </div>
  );
}
