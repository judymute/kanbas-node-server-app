import { Quiz } from './model.js';

const QuizRoutes = (app) => {
  app.get('/quizzes', async (req, res) => {
    try {
      const courseId = req.query.courseId;
      const quizzes = await Quiz.find({ courseId });
      res.status(200).json(quizzes);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/quizzes', async (req, res) => {
    try {
      const quizData = req.body;
      const quiz = new Quiz(quizData);
      await quiz.save();
      res.status(200).json(quiz);
    } catch (error) {
      console.error('Error saving quiz:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Remove the '/quizzes/save' route if it's not being used
};

export default QuizRoutes;