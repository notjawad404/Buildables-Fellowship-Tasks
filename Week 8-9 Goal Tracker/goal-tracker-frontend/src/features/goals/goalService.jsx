import axios from "axios";

const API_URL = "http://localhost:5000/api/goals/";

export const getGoals = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createGoal = async (goalData) => {
  const res = await axios.post(API_URL, goalData);
  return res.data;
};

export const updateGoal = async (id, goalData) => {
  const res = await axios.put(`${API_URL}${id}`, goalData);
  return res.data;
};

export const deleteGoal = async (id) => {
  const res = await axios.delete(`${API_URL}${id}`);
  return res.data;
};

const goalService = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
};

export default goalService;
