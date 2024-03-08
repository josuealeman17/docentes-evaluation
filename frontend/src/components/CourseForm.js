import React, { useState } from 'react';
import '../index.css';

//utils
import { fetchApiResponse } from '../utils/apiUtils';

function CourseForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const course = { title, description };

    try {
      const response = await fetchApiResponse('http://localhost:3000/courses', 'POST', course);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Course created successfully:', data);
    } catch (error) {
      console.error('Error creating course:', error.message);
    }
  };

  return (
    <div className="course-form-container">
      <h2>Create Course</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Create Course</button>
      </form>
    </div>
  );
}

export default CourseForm;
