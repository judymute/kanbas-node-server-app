import mongoose from 'mongoose';
import questionSchema from "../Questions/schema.js";

const quizSchema = new mongoose.Schema({
  _id: String,
  name: String,
  points: String,
  assignmentGroup: {
    type: String,
    enum: ["Quizzes", "Exams", "Assignments", "Project"],
    default: "Quizzes",},
  courseId: String,
  questions: { type: [questionSchema], default: [] }
},
{ collection: "quizzes" });

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;