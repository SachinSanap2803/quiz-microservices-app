import React, { useState } from 'react';
import { quizAPI } from '../../services/api';
import './CreateQuiz.css';

const CreateQuiz = () => {
  const [formData, setFormData] = useState({
    title: '',
    categoryName: '',
    numQuestions: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await quizAPI.createQuiz({
        title: formData.title,
        categoryName: formData.categoryName,
        numQuestions: parseInt(formData.numQuestions),
      });

      if (response.status === 201) {
        setMessage('Quiz created successfully!');
        setFormData({ title: '', categoryName: '', numQuestions: '' });
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Error creating quiz. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-quiz-container">
      <div className="create-quiz-card">
        <h2>Create New Quiz</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Quiz Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter quiz title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoryName">Category</label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              placeholder="e.g., Java, Python, JavaScript"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="numQuestions">Number of Questions</label>
            <input
              type="number"
              id="numQuestions"
              name="numQuestions"
              value={formData.numQuestions}
              onChange={handleChange}
              placeholder="Enter number of questions"
              min="1"
              required
            />
          </div>
          {message && (
            <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
              {message}
            </div>
          )}
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Creating...' : 'Create Quiz'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;


