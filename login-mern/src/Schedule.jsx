import React, { useState } from "react";
import Header from "./Header";
import "./style.css";

const preDefinedTasks = [
  { text: "Day 1 - Learn Hiragana - Vowels", completed: false },
  { text: "Day 2 - Review Hiragana - Vowels", completed: false },
  { text: "Day 3 - Learn Hiragana - Dakuten", completed: false },
  { text: "Day 4 - Learn Hiragana - Dakuten", completed: false },
  { text: "Day 5 - Review Hiragana - Vowels and Dakuten", completed: false },
  { text: "Day 6 - Learn Hiragana - Handakuten", completed: false },
  { text: "Day 7 - Learn Hiragana - Handakuten", completed: false },
  { text: "Day 8 - Review Hiragana - Vowels, Dakuten and Handakuten", completed: false },
  { text: "Day 9 - Review Hiragana - Vowels, Dakuten and Handakuten", completed: false },
  { text: "Day 10 - Learn Hiragana - Complete Hiragana", completed: false },
  { text: "Day 11 - Learn Hiragana - Complete Hiragana", completed: false },
  { text: "Day 12 - Review Hiragana - Complete Hiragana", completed: false },
  { text: "Day 13 - Quiz Hiragana - Complete Hiragana", completed: false },
  { text: "Day 14 - Learn Katakana - Vowels", completed: false },
  { text: "Day 15 - Review Katakana - Vowels", completed: false },
  { text: "Day 16 - Review Hiragana (Quiz) - Complete Hiragana", completed: false },
  { text: "Day 16 - Learn Katakana - Dakuten", completed: false },
  { text: "Day 17 - Learn Katakana - Dakuten", completed: false },
  { text: "Day 18 - Review Katakana - Vowels and Dakuten", completed: false },
  { text: "Day 19 - Review Hiragana (Quiz) - Complete Hiragana", completed: false },
  { text: "Day 20 - Learn Katakana - Handakuten", completed: false },
  { text: "Day 21 - Learn Katakana - Handakuten", completed: false },
  { text: "Day 22 - Review Katakana - Vowels, Dakuten and Handakuten", completed: false },
  { text: "Day 23 - Review Katakana - Vowels, Dakuten and Handakuten", completed: false },
  { text: "Day 24 - Review Hiragana (Quiz) - Complete Hiragana", completed: false },
  { text: "Day 25 - Learn Katakana - Complete Katakana", completed: false },
  { text: "Day 26 - Learn Katakana - Complete Katakana", completed: false },
  { text: "Day 27 - Review Katakana - Complete Katakana", completed: false },
  { text: "Day 28 - Quiz Katakana - Complete Katakana", completed: false },
  { text: "Day 29 - Review Hiragana (Quiz) - Complete Hiragana", completed: false },
  { text: "Day 30 - Review Katakana (Quiz) - Complete Katakana", completed: false }
];

function Schedule() {
  const [tasks, setTasks] = useState(preDefinedTasks);
  const [newTask, setNewTask] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleEditInputChange = (e) => {
    setEditTaskText(e.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const handleToggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleEditTask = (index) => {
    setIsEditing(index);
    setEditTaskText(tasks[index].text);
  };

  const handleSaveEditTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, text: editTaskText } : task
    );
    setTasks(updatedTasks);
    setIsEditing(null);
    setEditTaskText("");
  };

  const handleCancelEditTask = () => {
    setIsEditing(null);
    setEditTaskText("");
  };

  return (
    <div className="min-vh-100 text-white text-center">
      <Header />
      <h2>Your Schedule</h2>
      <div className="schedule-container">
        <div className="task-input">
          <input
            type="text"
            value={newTask}
            onChange={handleInputChange}
            placeholder="Enter new task"
            className="form-control rounded-15"
          />
          <button onClick={handleAddTask} className="btn btn-primary rounded-15 mt-2">
            Add Task
          </button>
        </div>
        <ul className="task-list list-unstyled mt-4">
          {tasks.map((task, index) => (
            <li key={index} className={`task-item ${task.completed ? "completed" : ""}`}>
              {isEditing === index ? (
                <>
                  <input
                    type="text"
                    value={editTaskText}
                    onChange={handleEditInputChange}
                    className="form-control rounded-15"
                  />
                  <div className="task-buttons">
                    <button
                      onClick={() => handleSaveEditTask(index)}
                      className="btn btn-success btn-sm ml-2 rounded-15"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEditTask}
                      className="btn btn-secondary btn-sm ml-2 rounded-15"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span className="task-text" onClick={() => handleToggleTask(index)}>{task.text}</span>
                  <div className="task-buttons">
                    <button
                      onClick={() => handleDeleteTask(index)}
                      className="btn btn-danger btn-sm ml-2 rounded-15"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEditTask(index)}
                      className="btn btn-warning btn-sm ml-2 rounded-15"
                    >
                      Edit
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Schedule;
