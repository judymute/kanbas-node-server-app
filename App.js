// const express = require('express') // equivalent to import

import express from 'express';
// import Hello from Hello.js
import Hello from "./Hello.js"
import Lab5 from "./Lab5.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import cors from "cors";

const app = express() // create new express instance
app.use(cors()); // make sure cors is used right after creating the app npmexpress instance
app.use(express.json()); // make sure this statement occurs AFTER setting up CORS


Lab5(app);
Hello(app) // pass app reference to Hello
ModuleRoutes(app); // configure JSON HTTP body parsing FIRST
// and THEN configure new routes

CourseRoutes(app);
// app.listen(4000) // listen to http://localhost:4000
app.listen(process.env.PORT || 4000);
