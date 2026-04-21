import React, { useState } from 'react';
import { questionAPI } from '../../services/api';
import './AddQuestion.css';

const AddQuestion = () => {
  const [formData, setFormData] = useState({
    questionTitle: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    rightAnswer: '',
    difficultylevel: 'Easy',
    category: '',
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
      const response = await questionAPI.addQuestion(formData);

      if (response.status === 201) {
        setMessage('Question added successfully!');
        setFormData({
          questionTitle: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          rightAnswer: '',
          difficultylevel: 'Easy',
          category: '',
        });
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Error adding question. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-question-container">
      <div className="add-question-card">
        <h2>Add New Question</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="questionTitle">Question</label>
            <textarea
              id="questionTitle"
              name="questionTitle"
              value={formData.questionTitle}
              onChange={handleChange}
              placeholder="Enter the question"
              rows="3"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="option1">Option 1</label>
            <input
              type="text"
              id="option1"
              name="option1"
              value={formData.option1}
              onChange={handleChange}
              placeholder="Enter option 1"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="option2">Option 2</label>
            <input
              type="text"
              id="option2"
              name="option2"
              value={formData.option2}
              onChange={handleChange}
              placeholder="Enter option 2"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="option3">Option 3</label>
            <input
              type="text"
              id="option3"
              name="option3"
              value={formData.option3}
              onChange={handleChange}
              placeholder="Enter option 3"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="option4">Option 4</label>
            <input
              type="text"
              id="option4"
              name="option4"
              value={formData.option4}
              onChange={handleChange}
              placeholder="Enter option 4"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="rightAnswer">Right Answer</label>
            <input
              type="text"
              id="rightAnswer"
              name="rightAnswer"
              value={formData.rightAnswer}
              onChange={handleChange}
              placeholder="Enter the correct answer (must match one of the options)"
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="difficultylevel">Difficulty Level</label>
              <select
                id="difficultylevel"
                name="difficultylevel"
                value={formData.difficultylevel}
                onChange={handleChange}
                required
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g., Java, Python"
                required
              />
            </div>
          </div>
          {message && (
            <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
              {message}
            </div>
          )}
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Adding...' : 'Add Question'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuestion;


