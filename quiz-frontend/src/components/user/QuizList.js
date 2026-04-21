import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { quizAPI } from '../../services/api';
import './QuizList.css';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, you'd fetch available quizzes from the backend
    // For now, we'll use a simple approach where users can enter a quiz ID
    setLoading(false);
  }, []);

  const handleStartQuiz = () => {
    const quizId = prompt('Enter Quiz ID:');
    if (quizId && !isNaN(quizId)) {
      navigate(`/quiz/${quizId}`);
    } else if (quizId) {
      alert('Please enter a valid quiz ID');
    }
  };

  return (
    <div className="quiz-list-container">
      <div className="quiz-list-card">
        <h2>Available Quizzes</h2>
        {loading ? (
          <div className="loading">Loading quizzes...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="quiz-list-content">
            <p className="info-text">
              To take a quiz, you need the Quiz ID. Please contact your administrator or enter a Quiz ID below.
            </p>
            <div className="quiz-actions">
              <button onClick={handleStartQuiz} className="start-quiz-button">
                Start Quiz by ID
              </button>
            </div>
            <div className="quiz-instructions">
              <h3>How to take a quiz:</h3>
              <ol>
                <li>Get a Quiz ID from your administrator</li>
                <li>Click "Start Quiz by ID" button</li>
                <li>Enter the Quiz ID when prompted</li>
                <li>Answer all questions</li>
                <li>Submit to see your score</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizList;


