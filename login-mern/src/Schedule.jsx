import { useState, useEffect } from "react";
import Header from "./Header";
import "./style.css";
import axios from "axios";

function Schedule() {
  //const [email, setEmail] = useState("");
  const [tasks, setTasks] = useState([]);
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
      const updatedTasks = [...tasks, { text: newTask, completed: false }];
      setTasks(updatedTasks);
      runUpdateSchedule(updatedTasks);
      setNewTask("");
    }
  };

  const handleToggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    runUpdateSchedule(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    runDeleteTask(updatedTasks[index]);
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
    runUpdateSchedule(updatedTasks);
    setIsEditing(null);
    setEditTaskText("");
  };

  const handleCancelEditTask = () => {
    setIsEditing(null);
    setEditTaskText("");
  };

  useEffect(() => {
    const id = localStorage.getItem("userID");
    axios
      .get(`http://localhost:3001/schedule?userID=${id}`)
      .then((result) => {
        if (result.data.status === "success") {
          setTasks(result.data.user);
        } else {
          setTasks(result.data.user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const runUpdateSchedule = (tasks) => {
    const id = localStorage.getItem("userID");
    axios.patch(`http://localhost:3001/schedule?userID=${id}`, {
      preDefinedTasks: tasks,
    });
  };

  const runDeleteTask = (task) => {
    const id = localStorage.getItem("userID");
    axios.delete(
      `http://localhost:3001/schedule?userID=${id}&taskID=${task._id}`
    );
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
          <button
            onClick={handleAddTask}
            className="btn btn-primary rounded-15 mt-2"
          >
            Add Task
          </button>
        </div>
        <ul className="task-list list-unstyled mt-4">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`task-item ${task.completed ? "completed" : ""}`}
            >
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
                  <span
                    className="task-text"
                    onClick={() => handleToggleTask(index)}
                  >
                    {task.text}
                  </span>
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
