import * as dao from "./dao.js";
let currentQuestion = null;
export default function QuestionRoutes(app) {
  const createQuestion = async (req, res) => {
    try {
      const question = await dao.createQuestion(req.body);
      console.log('Created question:', question);
      res.json(question);
    } catch (err) {
      console.error('Error creating question:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
    
  const deleteQuestion = async (req, res) => { };

  const updateQuestion = async (req, res) => {
    try {
      const { questionId } = req.params;
      const status = await dao.updateQuestion(questionId, req.body);
      currentQuestion = await dao.findQuestionById(questionId);
      console.log('update a question:' + status);
      res.json(status);
    } catch (err) {
      console.error('Error updating question:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  const findQuestionById = async (req, res) => {
    const question = await dao.findQuestionById(req.params.questionId);
    res.json(question);
  };
  
  const current = async (req, res) => {
    res.json(currentQuestion);
  };

  const findAllQuestions = async (req, res) => {
    try {
      const questions = await dao.findAllQuestions();
      console.log('All questions:', questions);
      res.json(questions);
    } catch (err) {
      console.error('Error fetching all questions:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  app.post("/api/questions", createQuestion);
  app.put("/api/questions/:questionId", updateQuestion);
  app.delete("/api/questions/:questionId", deleteQuestion);
  app.get("/api/questions/:questionId", findQuestionById);
  app.post("/api/questions/current", current);
  app.get("/api/questions", findAllQuestions);

}
