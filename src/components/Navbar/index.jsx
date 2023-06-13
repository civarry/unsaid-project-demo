import React from "react";
import styles from "./navbar.module.css";
import { NavLink, useLocation } from "react-router-dom";
import todoLogo from "../../assets/Logo.png";

function CustomNavLink({ to, exact, children }) {
  const location = useLocation();
  const isActive = exact
    ? location.pathname === to
    : location.pathname.startsWith(to);

  return (
    <NavLink to={to} className={isActive ? styles.active : ""}>
      {children}
    </NavLink>
  );
}

export function Navbar() {
  return (
    <header className={styles.header}>
      <img src={todoLogo} alt="" />
      <nav className={styles.navbar}>
        <ul>
          <li>
            <CustomNavLink to="/login">⋘</CustomNavLink>
          </li>
          <li>
            <CustomNavLink to="/" exact>
              Confessions
            </CustomNavLink>
          </li>
          <li>
            <CustomNavLink to="/add">Add</CustomNavLink>
          </li>
          <li>
            <CustomNavLink to="/login">⋙</CustomNavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
