import mongoose from "mongoose";
import questionSchema from "./schema.js";
const model = mongoose.model("QuestionModel", questionSchema);
export default model;