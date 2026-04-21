import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Quiz App
        </Link>
        <div className="navbar-menu">
          {user ? (
            <>
              {user.role === 'admin' ? (
                <>
                  <Link to="/admin/create-quiz" className="nav-link">
                    Create Quiz
                  </Link>
                  <Link to="/admin/add-question" className="nav-link">
                    Add Question
                  </Link>
                </>
              ) : (
                <Link to="/quizzes" className="nav-link">
                  Available Quizzes
                </Link>
              )}
              <span className="nav-user">Welcome, {user.name}</span>
              <button onClick={handleLogout} className="nav-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


