import mongoose from "mongoose";

const InvestorSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  user: {
    name: String,
    email: String,
    image: String
  },
  amount: Number,
  date: { type: Date, default: Date.now }
});


const ProjectSchema = new mongoose.Schema({
  title: String,
  userid: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  description: String,
  image: String,
  tags: String,
  goal: Number,
  investors: { type: [InvestorSchema], default: [] }
}, {
  timestamps: true,
  minimize:false
});

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
