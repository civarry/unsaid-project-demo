import React from "react";
import styles from "./task.module.css";
import { TbTrash } from "react-icons/tb";
import { FiMail } from "react-icons/fi";

// Function to get a random pastel color from the given list
const getRandomPastelColor = () => {
  const pastelColors = [
    "#F0F8FF",
    "#FAEBD7",
    "#E6E6FA",
    "#DCDCDC",
    "#FFFFF0",
    "#F0FFF0",
    "#F0FFFF",
    "#F5F5DC",
    "#FFEFD5",
    "#EEE8AA",
  ];
  const randomIndex = Math.floor(Math.random() * pastelColors.length);
  return pastelColors[randomIndex];
};

export function Task({ task, onDelete, isAdmin }) {
  const textColor = "#5e4f42"; // Replace with your text color
  const backgroundColor = getRandomPastelColor();

  return (
    <div className={styles.task}>
      <div className={styles.cardContainer}>
        <div className={styles.cardHeader}>
          <div className={styles.abcStyle}>
            <span>ABC</span>
          </div>
          <span>To: {task.title}</span>
          <i>
            <FiMail size={20} />
          </i>
        </div>
        <div className={styles.cardBody}>
          <div
            className={styles.cardDescription}
            style={{ backgroundColor: backgroundColor }}
          >
            <p>{task.description}</p>
          </div>
          <div className={styles.cardFooter}>
            <span>#unsaidfeelings</span>
          </div>
          <br />
          {isAdmin ? (
            <button
              className={styles.deleteButton}
              onClick={() => onDelete(task.id)}
            >
              <i>
                <TbTrash size={20} />
              </i>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
