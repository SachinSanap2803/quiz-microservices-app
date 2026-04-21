import axios from 'axios';

const API_BASE_URL = 'http://localhost:8083';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Question Service APIs
export const questionAPI = {
  getAllQuestions: () => api.get('/question-service/question/allQuestion'),
  getQuestionsByCategory: (category) => 
    api.get(`/question-service/question/category/${category}`),
  addQuestion: (question) => 
    api.post('/question-service/question/addQuestion', question),
  getQuestionForQuiz: (categoryName, numQuestions) =>
    api.get('/question-service/question/generate', {
      params: { categoryName, numQuestions }
    }),
  getQuestionsFromId: (ids) =>
    api.post('/question-service/question/getQuestions', ids),
  getScore: (responses) =>
    api.post('/question-service/question/getScore', responses),
};

// Quiz Service APIs
export const quizAPI = {
  createQuiz: (quizDto) =>
    api.post('/quiz-service/quiz/create', quizDto),
  getQuizQuestions: (id) =>
    api.get(`/quiz-service/quiz/get/${id}`),
  submitQuiz: (id, responses) =>
    api.post(`/quiz-service/quiz/submit/${id}`, responses),
};

export default api;


