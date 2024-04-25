import User from "./model.js";

let currentUser = null;

export default function UserRoutes(app) {
  const createUser = async (req, res) => {
    try {
      const { username, password, firstName, lastName, email, dob, role } = req.body;
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      const user = new User({
        username,
        password,
        firstName,
        lastName,
        email,
        dob,
        role,
      });
      await user.save();
      res.json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.sendStatus(500);
    }
  };

  const deleteUser = async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.userId);
      res.sendStatus(200);
    } catch (error) {
      console.error("Error deleting user:", error);
      res.sendStatus(500);
    }
  };

  const findAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error("Error retrieving users:", error);
      res.sendStatus(500);
    }
  };

  const findUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      res.json(user);
    } catch (error) {
      console.error("Error retrieving user:", error);
      res.sendStatus(500);
    }
  };

  const updateUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const updateData = req.body;
      const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.sendStatus(500);
    }
  };

  const signup = async (req, res) => {
    try {
      const { username, password, firstName, lastName, email, dob } = req.body;
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Username already taken" });
      }
      const newUser = new User({ username, password, firstName, lastName, email, dob });
      await newUser.save();
      res.json(newUser);
    } catch (error) {
      console.error("Error signing up:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };

  const signin = async (req, res) => {
    try {
      const { username, password } = req.body;
      const currentUser = await User.findOne({ username });
      if (!currentUser || password !== currentUser.password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } catch (error) {
      console.error("Error signing in:", error);
      res.sendStatus(500);
    }
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const profile = (req, res) => {
    console.log('Session:', req.session);
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.json(currentUser);
  };

  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}
