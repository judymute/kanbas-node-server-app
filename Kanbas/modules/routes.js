import db from "../Database/index.js";
const { Module } = db;

function ModuleRoutes(app) {
  app.delete("/api/modules/:mid", async (req, res) => {
    try {
      const { mid } = req.params;
      await Module.findByIdAndDelete(mid);
      res.sendStatus(200);
    } catch (error) {
      console.error("Error deleting module:", error);
      res.sendStatus(500);
    }
  });

  app.post("/api/courses/:cid/modules", async (req, res) => {
    try {
      const { cid } = req.params;
      const newModule = new Module({
        ...req.body,
        course: cid,
        _id: new Date().getTime().toString(),
      });
      await newModule.save();
      res.send(newModule);
    } catch (error) {
      console.error("Error creating module:", error);
      res.sendStatus(500);
    }
  });

  app.put("/api/modules/:mid", async (req, res) => {
    try {
      const { mid } = req.params;
      await Module.findByIdAndUpdate(mid, req.body);
      res.sendStatus(204);
    } catch (error) {
      console.error("Error updating module:", error);
      res.sendStatus(500);
    }
  });

  app.get("/api/courses/:cid/modules", async (req, res) => {
    try {
      const { cid } = req.params;
      const modules = await Module.find({ course: cid }).sort('_id');
      res.send(modules);
    } catch (error) {
      console.error("Error retrieving modules:", error);
      res.sendStatus(500);
    }
  });
}

export default ModuleRoutes;