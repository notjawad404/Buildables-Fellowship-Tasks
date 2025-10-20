import { useDispatch } from "react-redux";
import { removeGoal, updateGoal } from "../features/goals/goalSlice";
import { useState } from "react";

export default function GoalItem({ goal }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState({
    title: goal.title,
    description: goal.description,
    deadline: goal.deadline.split("T")[0],
  });

  // Calculate progress based on timeline
  const totalDuration = new Date(goal.deadline) - new Date(goal.addedDate);
  const elapsed = new Date() - new Date(goal.addedDate);
  const timeProgress = Math.min((elapsed / totalDuration) * 100, 100);

  const handleToggleComplete = () => {
    dispatch(updateGoal({ id: goal._id, goalData: { completed: !goal.completed } }));
  };

  const handleSaveEdit = async () => {
    await dispatch(updateGoal({ id: goal._id, goalData: editedGoal }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(removeGoal(goal._id));
  };

  return (
    <tr className={`${goal.completed ? "bg-green-50" : "bg-white"} border-b`}>
      <td className="px-4 py-2">
        {isEditing ? (
          <input
            className="border p-1 rounded w-full"
            value={editedGoal.title}
            onChange={(e) => setEditedGoal({ ...editedGoal, title: e.target.value })}
          />
        ) : (
          goal.title
        )}
      </td>

      <td className="px-4 py-2">
        {isEditing ? (
          <input
            className="border p-1 rounded w-full"
            value={editedGoal.description}
            onChange={(e) => setEditedGoal({ ...editedGoal, description: e.target.value })}
          />
        ) : (
          goal.description
        )}
      </td>

      <td className="px-4 py-2">
        {new Date(goal.deadline).toLocaleDateString()}
      </td>

      {/* Progress bar */}
      <td className="px-4 py-2">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all"
            style={{ width: `${timeProgress}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">{Math.floor(timeProgress)}%</p>
      </td>

      {/* Complete toggle */}
      <td className="px-4 py-2 text-center">
        <input
          type="checkbox"
          checked={goal.completed}
          onChange={handleToggleComplete}
          className="w-5 h-5 accent-green-600"
        />
      </td>

      <td className="px-4 py-2 text-right space-x-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSaveEdit}
              className="text-sm bg-green-500 text-white px-2 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-sm bg-gray-400 text-white px-2 py-1 rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm bg-yellow-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-sm bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
}
