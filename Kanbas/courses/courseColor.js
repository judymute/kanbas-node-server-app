import Database from "../../Database/index.js";

async function updateCourseColor(courseId, color) {
  // Find the course with the given courseId in the Database.courses array
  const course = Database.courses.find((c) => c._id === courseId);

  if (course) {
    // Update the color property of the found course
    course.color = color;
  } else {
    throw new Error('Course not found');
  }
}

export { updateCourseColor };