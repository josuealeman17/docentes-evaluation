import React, { useState, useEffect } from 'react';
//utils
import { fetchApiResponse } from '../utils/apiUtils';

function CourseTopicList() {
  const [courses, setCourses] = useState([]);
  const [topics, setTopics] = useState([]);
  const [editCourseId, setEditCourseId] = useState(null);
  const [editTopicId, setEditTopicId] = useState(null);

  useEffect(() => {
    fetchCourses();
    fetchTopics();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await fetchApiResponse(
        'http://localhost:3000/courses',
        'GET',
        null,
      );

      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchTopics = async () => {
    try {
      const data = await fetchApiResponse(
        'http://localhost:3000/topics',
        'GET',
        null,
      );

      setTopics(data);
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };

  const deleteCourse = async (id) => {
    try {
      await fetch(`http://localhost:3000/courses/${id}`, {
        method: 'DELETE',
      });
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const updateCourse = async (id, courseData) => {
    try {
      await fetch(`http://localhost:3000/courses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });
      fetchCourses();
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleTitleChange = (id, title) => {
    setCourses(
      courses.map((course) => {
        if (course._id === id) {
          return { ...course, title: title };
        }
        return course;
      }),
    );
  };

  const handleDescriptionChange = (id, description) => {
    setCourses(
      courses.map((course) => {
        if (course._id === id) {
          return { ...course, description: description };
        }
        return course;
      }),
    );
  };

  const deleteTopic = async (id) => {
    try {
      await fetch(`http://localhost:3000/topics/${id}`, {
        method: 'DELETE',
      });
      fetchTopics();
    } catch (error) {
      console.error('Error deleting topic:', error);
    }
  };

  const updateTopic = async (id, topicData) => {
    try {
      await fetch(`http://localhost:3000/topics/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(topicData),
      });
      fetchTopics();
    } catch (error) {
      console.error('Error updating topic:', error);
    }
  };

  const handleContentChange = (id, content) => {
    setTopics(
      topics.map((topic) => {
        if (topic._id === id) {
          return { ...topic, content: content };
        }
        return topic;
      }),
    );
  };

  return (
    <div className="course-topic-list-container">
      <div className="course-list">
        <h2>Courses</h2>
        <ul>
          {courses.map((course) => (
            <li key={course._id}>
              <strong>ID:</strong> {course._id} <br />
              <strong>Title:</strong>{' '}
              {editCourseId === course._id ? (
                <input
                  type="text"
                  value={course.title}
                  onChange={(e) =>
                    handleTitleChange(course._id, e.target.value)
                  }
                />
              ) : (
                <span>{course.title}</span>
              )}
              <br />
              <strong>Description:</strong>{' '}
              {editCourseId === course._id ? (
                <textarea
                  value={course.description}
                  onChange={(e) =>
                    handleDescriptionChange(course._id, e.target.value)
                  }
                />
              ) : (
                <p>{course.description}</p>
              )}
              <br />
              {editCourseId === course._id ? (
                <>
                  <button
                    onClick={() =>
                      updateCourse(course._id, {
                        title: course.title,
                        description: course.description,
                      })
                    }
                  >
                    Save
                  </button>
                  <button onClick={() => setEditCourseId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => setEditCourseId(course._id)}>
                    Edit
                  </button>
                  <button onClick={() => deleteCourse(course._id)}>
                    Delete
                  </button>
                </>
              )}
              <ul>
                {topics
                  .filter((topic) => topic.courseId === course._id)
                  .map((topic) => (
                    <li key={topic._id}>
                      <strong>Title:</strong> {topic.title}
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <div className="topic-list">
        <h2>Topics</h2>
        <ul>
          {topics.map((topic) => (
            <li key={topic._id}>
              <strong>ID:</strong> {topic._id} <br />
              <strong>Title:</strong>{' '}
              {editTopicId === topic._id ? (
                <input
                  type="text"
                  value={topic.title}
                  onChange={(e) => handleTitleChange(topic._id, e.target.value)}
                />
              ) : (
                <span>{topic.title}</span>
              )}
              <br />
              <span>Content:</span>{' '}
              {editTopicId === topic._id ? (
                <textarea
                  value={topic.content}
                  onChange={(e) =>
                    handleContentChange(topic._id, e.target.value)
                  }
                />
              ) : (
                <p>{topic.content}</p>
              )}
              <br />
              {editTopicId === topic._id ? (
                <>
                  <button
                    onClick={() =>
                      updateTopic(topic._id, {
                        title: topic.title,
                        content: topic.content,
                      })
                    }
                  >
                    Save
                  </button>
                  <button onClick={() => setEditTopicId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => setEditTopicId(topic._id)}>
                    Edit
                  </button>
                  <button onClick={() => deleteTopic(topic._id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CourseTopicList;
