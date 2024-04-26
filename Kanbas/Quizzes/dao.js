import model from "./model.js";
export const createQuiz = (quiz) => {
    return model.create(quiz);
  };
export const updateQuiz = (quizId, quiz) =>  model.updateOne({ _id: quizId }, { $set: quiz });
export const deleteQuiz = (quizId) => model.deleteOne({ _id: quizId });
export const findQuizById = (quizId) => model.findById(quizId);
export const findAllQuizzes = () => model.find();