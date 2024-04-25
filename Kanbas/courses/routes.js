import db from "../Database/index.js";
const { Course } = db;

export default function CourseRoutes(app) {

  app.get("/api/courses/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const course = await Course.findById(id);
      if (!course) {
        res.status(404).send("Course not found");
        return;
      }
      console.log("course retrieved: " + course);
      res.send(course);
    } catch (error) {
      console.error("Error retrieving course:", error);
      res.sendStatus(500);
    }
  });

  app.put("/api/courses/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const course = req.body;
      await Course.findByIdAndUpdate(id, course);
      console.log("courses found by id: " + course);
      res.sendStatus(204);
    } catch (error) {
      console.error("Error updating course:", error);
      res.sendStatus(500);
    }
  });

  app.delete("/api/courses/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await Course.findByIdAndDelete(id);
      res.sendStatus(204);
    } catch (error) {
      console.error("Error deleting course:", error);
      res.sendStatus(500);
    }
  });

  app.post("/api/courses", async (req, res) => {
    try {
      const course = new Course(req.body);
      await course.save();
      res.send(course);
    } catch (error) {
      console.error("Error creating course:", error);
      res.sendStatus(500);
    }
  });

  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await Course.find().sort('_id');
      res.send(courses);
    } catch (error) {
      console.error("Error retrieving courses:", error);
      res.sendStatus(500);
    }
  });

  app.put('/api/courses/:id/color', async (req, res) => {
    try {
      const courseId = req.params.id;
      const { color } = req.body;
      await Course.findByIdAndUpdate(courseId, { color });
      res.sendStatus(200);
    } catch (error) {
      console.error('Error updating course color:', error);
      res.sendStatus(500);
    }
  });
}