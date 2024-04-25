import { Quiz } from './model.js';

const QuizRoutes = (app) => {
  app.post('/quizzes', async (req, res) => {
    try {
      const quiz = new Quiz(req.body);
      await quiz.save();
      res.status(200).json(quiz);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/quizzes', async (req, res) => {
    try {
      const courseId = req.query.courseId;
      const quizzes = await Quiz.find({ courseId });
      res.status(200).json(quizzes);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/quizzes/save', async (req, res) => {
    try {
      const quizzesData = req.body;
      await Quiz.insertMany(quizzesData);
      res.status(200).json({ message: 'Quizzes saved successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
};

export default QuizRoutes;