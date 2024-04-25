import db from "../Database/index.js";
const { Course } = db;


async function updateCourseColor(courseId, color) {
  try {
    const course = await Course.findByIdAndUpdate(courseId, { color }, { new: true });
    if (!course) {
      throw new Error('Course not found');
    }
    return course;
  } catch (error) {
    throw error;
  }
}

export { updateCourseColor };