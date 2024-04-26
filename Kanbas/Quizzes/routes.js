import * as dao from "./dao.js";

const QuizRoutes = (app) => {
  const createQuiz = async (req, res) => {
    const quiz = await dao.createQuiz(req.body);
    console.log('create a quiz:' + quiz);
    res.json(quiz);
  };

  const deleteQuiz = async (req, res) => { };

  const findQuizById = async (req, res) => {
    const quiz = await dao.findQuizById(req.params.quizId);
    res.json(quiz);
  };

  const updateQuiz = async (req, res) => {
    const { quizId } = req.params;
    const updatedQuiz = await dao.updateQuiz(quizId, req.body);
    console.log('update a quiz:' + updatedQuiz);
    res.json(updatedQuiz);
  };

  const current = async (req, res) => {
    res.json(currentQuiz);
  };

  const findAllQuizzes = async (req, res) => {
    const quizzes = await dao.findAllQuizzes();
    res.json(quizzes);
  };


  app.post("/api/quizzes", createQuiz);
  app.delete("/api/quizzes/:quizId", deleteQuiz);
  app.put("/api/quizzes/:quizId", updateQuiz);
  app.get("/api/quizzes/:quizId", findQuizById);
  app.post("/api/quizzes/current", current);
  app.get("/api/quizzes", findAllQuizzes);
};

export default QuizRoutes;