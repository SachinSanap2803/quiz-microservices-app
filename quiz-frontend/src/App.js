import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import CreateQuiz from './components/admin/CreateQuiz';
import AddQuestion from './components/admin/AddQuestion';
import QuizList from './components/user/QuizList';
import TakeQuiz from './components/user/TakeQuiz';
import Score from './components/user/Score';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/admin/create-quiz"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <CreateQuiz />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/add-question"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AddQuestion />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/quizzes"
                element={
                  <ProtectedRoute>
                    <QuizList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/quiz/:id"
                element={
                  <ProtectedRoute>
                    <TakeQuiz />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/quiz/:id/score"
                element={
                  <ProtectedRoute>
                    <Score />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
