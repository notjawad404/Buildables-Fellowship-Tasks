import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    deadline: { type: Date, required: true },
    addedDate: { type: Date, default: Date.now },
    progress: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

goalSchema.pre("save", function (next) {
  if (this.progress >= 100) this.completed = true;
  next();
});

const Goal = mongoose.model("Goal", goalSchema);
export default Goal;
