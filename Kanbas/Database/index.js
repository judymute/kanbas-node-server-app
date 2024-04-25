import mongoose from 'mongoose';
import userSchema from "../Users/schema.js";

const courseSchema = new mongoose.Schema({
  _id: String,
  name: String,
  number: String,
  startDate: String,
  endDate: String,
  image: String,
  color: String,
});

const moduleSchema = new mongoose.Schema({
  _id: String,
  name: String,
  description: String,
  course: String,
  lessons: [
    {
      _id: String,
      name: String,
      description: String,
      module: String,
    },
  ],
});


const assignmentSchema = new mongoose.Schema({
  _id: String,
  title: String,
  course: String,
});

const Course = mongoose.model('Course', courseSchema);
const Module = mongoose.model('Module', moduleSchema);
const User = mongoose.model('User', userSchema);
const Assignment = mongoose.model('Assignment', assignmentSchema);

export default { Course, Module, User, Assignment };