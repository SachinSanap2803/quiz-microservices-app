import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to Quiz App</h1>
        <p className="home-subtitle">
          Test your knowledge with our interactive quiz platform
        </p>
        {!user ? (
          <div className="home-actions">
            <Link to="/login" className="home-button primary">
              Get Started
            </Link>
          </div>
        ) : (
          <div className="home-actions">
            {user.role === 'admin' ? (
              <>
                <Link to="/admin/create-quiz" className="home-button primary">
                  Create Quiz
                </Link>
                <Link to="/admin/add-question" className="home-button secondary">
                  Add Question
                </Link>
              </>
            ) : (
              <Link to="/quizzes" className="home-button primary">
                Take a Quiz
              </Link>
            )}
          </div>
        )}
        <div className="home-features">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Create Quizzes</h3>
            <p>Admins can create custom quizzes with multiple questions</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Take Quizzes</h3>
            <p>Users can test their knowledge and get instant results</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>View Scores</h3>
            <p>Get immediate feedback on your performance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;


