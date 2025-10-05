import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";
import Login from "./auth/Login";
import Register from "./auth/Register";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) getTasks();
  }, [token]);

  const getTasks = async () => {
    const res = await fetch("http://localhost:5000/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.ok) setTasks(data);
  };

  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    if (res.ok) setTasks([...tasks, data]);
  };

  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) setTasks(tasks.filter((task) => task._id !== id));
  };

  const toggleReminder = async (id) => {
    const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ reminder: true }),
    });
    if (res.ok) getTasks();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/"; // redirect to login
  };

  return (
    <Router>
      <div className="container">
        {/* Show Header only when logged in */}
        {token && (
          <Header
            onAdd={() => setShowAddTask(!showAddTask)}
            showAdd={showAddTask}
            onLogout={handleLogout}
            isLoggedIn={!!token}
          />
        )}

        <Routes>
          {/* LOGIN is now the default route */}
          <Route
            path="/"
            element={<Login />}
          />

          {/* TASKS are now on /home */}
          <Route
            path="/home"
            element={
              token ? (
                <>
                  {showAddTask && <AddTask onAdd={addTask} />}
                  {tasks.length > 0 ? (
                    <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
                  ) : (
                    "No Tasks To Show"
                  )}
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />

          {/* Other routes */}
          <Route path="/about" element={<About />} />
          <Route
            path="/register"
            element={<Register />}
          />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
