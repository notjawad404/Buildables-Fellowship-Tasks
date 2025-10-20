import Goal from "../models/Goal.js";

// Get all goals
export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find().sort({ createdAt: -1 });
    res.status(200).json(goals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new goal
export const createGoal = async (req, res) => {
  const { title, description, deadline } = req.body;

  if (!title || !deadline)
    return res.status(400).json({ message: "Title and deadline are required" });

  try {
    const goal = await Goal.create({ title, description, deadline });
    res.status(201).json(goal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update goal
export const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: "Goal not found" });

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(updatedGoal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete goal
export const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: "Goal not found" });

    await goal.deleteOne();
    res.status(200).json({ message: "Goal deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
