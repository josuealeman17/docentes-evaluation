import React from 'react'
import CourseForm from '../components/CourseForm'
import CourseTopicList from '../components/CourseTopicList'
import TopicForm from '../components/TopicForm'
import '../index.css'


const Home = () => {
  return (
    <div className="App">
      <div className="form-container">
        <CourseForm />
        <TopicForm />
      </div>

      <div className="list">
        <CourseTopicList />
      </div>
    </div>
  )
}

export default Home