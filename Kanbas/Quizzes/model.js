import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  name: String,
  assignmentGroup: String,
  courseId: String,
});

export const Quiz = mongoose.model('Quiz', quizSchema);