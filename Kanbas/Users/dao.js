import model from "./model.js";


export const createUser = (user) => {
  // remove _id field just in case client sends it
  delete user._id
  // database will create _id for us instead
  return model.create(user);
}

export const findAllUsers = () => model.find();
export const findUserById = (userId) =>
  model.findById(userId);

export const findUserByUsername = (username) =>  model.findOne({ username: username });
export const findUserByCredentials = (username, password) =>  model.findOne({ username, password });
export const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });
