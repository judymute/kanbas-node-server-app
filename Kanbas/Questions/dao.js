import model from "./model.js";
export const createQuestion = (question) => {
delete question._id
model.create(question);
}
export const updateQuestion = (questionId, question) =>  model.updateOne({ _id: questionId }, { $set: question });
export const deleteQuestion = (questionId) => model.deleteOne({ _id: questionId });
export const findQuestionById = (questionId) => model.findById(questionId);
export const findAllQuestions = () => model.find();