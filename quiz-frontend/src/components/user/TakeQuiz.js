import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { quizAPI } from '../../services/api';
import './TakeQuiz.css';

const TakeQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchQuizQuestions();
  }, [id]);

  const fetchQuizQuestions = async () => {
    try {
      setLoading(true);
      const response = await quizAPI.getQuizQuestions(id);
      if (response.data) {
        setQuestions(response.data);
        // Initialize responses object
        const initialResponses = {};
        response.data.forEach((q) => {
          initialResponses[q.id] = '';
        });
        setResponses(initialResponses);
      }
    } catch (error) {
      setError('Failed to load quiz. Please check the quiz ID.');
      console.error('Error fetching quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setResponses({
      ...responses,
      [questionId]: answer,
    });
  };

  const handleSubmit = async () => {
    // Check if all questions are answered
    const unanswered = questions.filter((q) => !responses[q.id]);
    if (unanswered.length > 0) {
      if (
        !window.confirm(
          `You have ${unanswered.length} unanswered question(s). Do you want to submit anyway?`
        )
      ) {
        return;
      }
    }

    setSubmitting(true);
    try {
      const responseList = Object.keys(responses).map((questionId) => ({
        id: parseInt(questionId),
        response: responses[questionId] || '',
      }));

      const scoreResponse = await quizAPI.submitQuiz(id, responseList);
      const score = scoreResponse.data;
      navigate(`/quiz/${id}/score`, { state: { score, total: questions.length } });
    } catch (error) {
      setError('Failed to submit quiz. Please try again.');
      console.error('Error submitting quiz:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="take-quiz-container">
        <div className="loading">Loading quiz questions...</div>
      </div>
    );
  }

  if (error && questions.length === 0) {
    return (
      <div className="take-quiz-container">
        <div className="error-message">{error}</div>
        <button onClick={() => navigate('/quizzes')} className="back-button">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="take-quiz-container">
      <div className="quiz-header">
        <h2>Quiz Questions</h2>
        <p className="quiz-info">
          Answer all questions and click submit when done.
        </p>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="questions-container">
        {questions.map((question, index) => (
          <div key={question.id} className="question-card">
            <div className="question-number">Question {index + 1}</div>
            <h3 className="question-title">{question.questionTitle}</h3>
            <div className="options">
              {[
                question.option1,
                question.option2,
                question.option3,
                question.option4,
              ].map((option, optIndex) => (
                <label key={optIndex} className="option-label">
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    checked={responses[question.id] === option}
                    onChange={() => handleAnswerChange(question.id, option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="quiz-footer">
        <button
          onClick={handleSubmit}
          className="submit-button"
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Quiz'}
        </button>
        <button onClick={() => navigate('/quizzes')} className="back-button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TakeQuiz;


