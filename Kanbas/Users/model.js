import mongoose from "mongoose";
// import schema from "./schema.js";

import userSchema from "./schema.js";
// Load the mongoose library and the user schema

const model = mongoose.model("UserModel", userSchema);
// Create a mongoose model named "UserModel" based on the schema

export default model;
// Export the model so it can be used elsewhere
