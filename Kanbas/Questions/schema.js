import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    _id: String,
    name: String,
    points: String,
    quiz: String,
    value: String,
    type: {
      type: String,
      enum: ["MC", "TF", "BLANK"],
      default: "MC",},
    answers: [
        {
          _id: String,
          value: String,
          correct: Boolean,
        },
    ],
  },
  { collection: "questions" });
export default questionSchema;

