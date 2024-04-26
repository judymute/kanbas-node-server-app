import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  _id: String,
  name: String,
  assignmentGroup: String,
  courseId: String,
});

export const Quiz = mongoose.model('Quiz', quizSchema);