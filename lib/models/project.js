import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: String,
  userid: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  description: String,
  image: String,
  tags: String,
  goal: Number,
},{
    timestamps: true,
});

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
