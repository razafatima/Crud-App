import { useEffect, useState } from "react";
import "./todolist.module.css";

export default function TodoList() {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);


  useEffect(() =>{
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if(savedTasks){
      setTasks(savedTasks);
    }
  }, []);

  const updatedLocalStorage = (updatedTasks) => {
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const addTask = () => {
    if (task.trim() !== "" && description.trim() !== "") {
      if (editIndex !== null) {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = { task, description };
        setTasks(updatedTasks);
        setEditIndex(null);
      } else {
        updatedLocalStorage([...tasks, { task, description }]);
      }
      setTask("");
      setDescription("");
    }
  };

  const editTask = (index) => {
    setTask(tasks[index].task);
    setDescription(tasks[index].description);
    setEditIndex(index);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    updatedLocalStorage(updatedTasks);
  };



  return (
    <div className="container">
      <h2>Todo App</h2>

      <div className="input-container">
        <label>Task Title:</label>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
          className="input-field"
        />

        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          className="textarea-field"
        ></textarea>

        <button onClick={addTask} className="add-button">
          {editIndex !== null ? "Save Task" : "Add Task"}
        </button>
      </div>

      <div className="task-table">
        <h3>Task List</h3>
        <table border="1">
          <thead>
            <tr>
              <th>#</th>
              <th>Task</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((t, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{t.task}</td>
                  <td>{t.description}</td>
                  <td>
                    <button className="edit-button" onClick={() => editTask(index)}>Edit</button>
                    <button className="delete-button" onClick={() => deleteTask(index)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>No tasks added yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
