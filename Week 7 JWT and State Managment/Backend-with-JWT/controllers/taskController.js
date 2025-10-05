import Task from "../model/taskModel1.js";

// Get all tasks for logged-in user
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create task
export const createTask = async (req, res) => {
  const { text, day, reminder } = req.body;

  try {
    const task = await Task.create({
      user: req.user.id,
      text,
      day,
      reminder,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update task
export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).json({ message: "Task not found" });

  if (task.user.toString() !== req.user.id)
    return res.status(401).json({ message: "Not authorized" });

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTask);
};

// Delete task
export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).json({ message: "Task not found" });

  if (task.user.toString() !== req.user.id)
    return res.status(401).json({ message: "Not authorized" });

  await task.deleteOne();

  res.status(200).json({ message: "Task deleted successfully" });
};
