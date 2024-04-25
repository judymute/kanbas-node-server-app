// const express = require('express') // equivalent to import
import "dotenv/config"; // import the new dotenv librarys to read .env file

import session from "express-session"; // import new server session library
import express from 'express';
// import Hello from Hello.js
import Hello from "./Hello.js"
import Lab5 from "./Lab5.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./Kanbas/Users/routes.js";
import QuestionRoutes from "./Kanbas/Questions/routes.js";
import QuizRoutes from "./Kanbas/Quizzes/routes.js";



// mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING  || 'mongodb://127.0.0.1:27017/kanbas'
mongoose.connect(CONNECTION_STRING)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

console.log(CONNECTION_STRING)
const app = express() // create new express instance
app.use(cors({
  credentials: true, // support cookies
  origin: [process.env.FRONTEND_URL, "http://localhost:3000"]
})); // make sure cors is used right after creating the app npmexpress instance


app.use(express.json()); // make sure this statement occurs AFTER setting up CORS


const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    // domain: process.env.HTTP_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));

QuestionRoutes(app);
UserRoutes(app);
Lab5(app);
Hello(app) // pass app reference to Hello
ModuleRoutes(app); // configure JSON HTTP body parsing FIRST
// and THEN configure new routes
QuizRoutes(app);

CourseRoutes(app);
// app.listen(4000) // listen to http://localhost:4000
const port = process.env.PORT || 4000;
app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
