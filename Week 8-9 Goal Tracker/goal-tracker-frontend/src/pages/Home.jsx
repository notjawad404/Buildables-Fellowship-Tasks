import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGoals } from "../features/goals/goalSlice";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";

export default function Home() {
  const dispatch = useDispatch();
  const { goals, loading } = useSelector((state) => state.goals);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    dispatch(fetchGoals());
  }, [dispatch]);

  const filteredGoals = goals
    .filter((g) => {
      if (filter === "completed") return g.completed;
      if (filter === "pending") return !g.completed;
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === "asc")
        return new Date(a.deadline) - new Date(b.deadline);
      else return new Date(b.deadline) - new Date(a.deadline);
    });

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🎯 Goal Tracker
      </h1>

      <GoalForm />

      {/* Filter & Sort */}
      <div className="flex justify-center gap-4 mb-6">
        <select
          className="border rounded-lg p-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Goals</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>

        <select
          className="border rounded-lg p-2"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Deadline ↑</option>
          <option value="desc">Deadline ↓</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto max-w-5xl mx-auto bg-white shadow rounded-2xl">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Deadline</th>
              <th className="px-4 py-2">Progress</th>
              <th className="px-4 py-2 text-center">Completed</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : filteredGoals.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No goals found.
                </td>
              </tr>
            ) : (
              filteredGoals.map((goal) => <GoalItem key={goal._id} goal={goal} />)
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
