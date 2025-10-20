import { useState } from "react";
import { useDispatch } from "react-redux";
import { addGoal, fetchGoals } from "../features/goals/goalSlice";

export default function GoalForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addGoal({ title, description, deadline }));
    await dispatch(fetchGoals());
    setTitle("");
    setDescription("");
    setDeadline("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-2xl p-6 mb-6 w-full max-w-lg mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Add a New Goal</h2>
      <input
        className="border w-full p-2 rounded mb-3"
        placeholder="Goal title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="border w-full p-2 rounded mb-3"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        className="border w-full p-2 rounded mb-3"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-2xl transition"
      >
        Add Goal
      </button>
    </form>
  );
}
