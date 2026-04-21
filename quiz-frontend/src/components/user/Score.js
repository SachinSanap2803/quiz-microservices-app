import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Score.css';

const Score = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || { score: 0, total: 0 };

  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  const getScoreColor = () => {
    if (percentage >= 80) return '#28a745';
    if (percentage >= 60) return '#ffc107';
    return '#dc3545';
  };

  const getScoreMessage = () => {
    if (percentage >= 80) return 'Excellent!';
    if (percentage >= 60) return 'Good Job!';
    return 'Keep Practicing!';
  };

  return (
    <div className="score-container">
      <div className="score-card">
        <div className="score-icon">✓</div>
        <h2>Quiz Completed!</h2>
        <div className="score-display">
          <div className="score-circle" style={{ borderColor: getScoreColor() }}>
            <div className="score-value" style={{ color: getScoreColor() }}>
              {percentage}%
            </div>
          </div>
        </div>
        <div className="score-details">
          <p className="score-message" style={{ color: getScoreColor() }}>
            {getScoreMessage()}
          </p>
          <p className="score-text">
            You scored <strong>{score}</strong> out of <strong>{total}</strong>
          </p>
        </div>
        <div className="score-actions">
          <button
            onClick={() => navigate('/quizzes')}
            className="primary-button"
          >
            Take Another Quiz
          </button>
          <button onClick={() => navigate('/')} className="secondary-button">
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Score;


