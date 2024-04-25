import * as dao from "./dao.js";
let currentQuestion = null;
export default function QuestionRoutes(app) {
  const createQuestion = async (req, res) => {
        const question = await dao.createQuestion(req.body);
        console.log('create a question:' + question);
        res.json(question);
      };
    
  const deleteQuestion = async (req, res) => { };

  const updateQuestion = async (req, res) => {
    const { questionId } = req.params;
    const status = await dao.updateQuestion(questionId, req.body);
    currentQuestion = await dao.findQuestionById(questionId);
    console.log('update a question:' + status);
    res.json(status);
  };

  const findQuestionById = async (req, res) => {
    const question = await dao.findUserById(req.params.userId);
    res.json(question);
  };
  
  const current = async (req, res) => {
    res.json(currentQuestion);
  };

  const findAllQuestions = async (req, res) => {
    const users = await dao.findAllQuestions();
    res.json(users);
  };


  app.post("/api/questions", createQuestion);
  app.put("/api/questions/:questionId", updateQuestion);
  app.delete("/api/questions/:questionId", deleteQuestion);
  app.get("/api/questions/:questionId", findQuestionById);
  app.post("/api/questions/current", current);
  app.get("/api/questions", findAllQuestions);
}
