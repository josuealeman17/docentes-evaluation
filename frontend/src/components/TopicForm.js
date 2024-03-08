import React, { useState } from 'react';
import '../index.css'; 
//utils
import { fetchApiResponse } from '../utils/apiUtils';

function TopicForm() {
  const [courseId, setCourseId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const topic = { courseId, title, content };

    try {
      const response = await fetchApiResponse('http://localhost:3000/topics', 'POST', topic);

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
    <div className="topic-form-container"> 
      <h2>Create Topic</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course ID:</label>
          <input type="text" value={courseId} onChange={(e) => setCourseId(e.target.value)} />
        </div>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Content:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <button type="submit">Create Topic</button>
      </form>
    </div>
  );
}

export default TopicForm;
