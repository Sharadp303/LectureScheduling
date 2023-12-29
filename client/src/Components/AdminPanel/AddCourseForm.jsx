// components/AdminPanel/AddCourseForm.js
import React, { useState } from 'react';
import ErrorMessage from '../Common/ErrorMessage';
import axios from 'axios';
import './Addcourse.css'
import SucessMessage from '../Common/SucessMessage';

const AddCourseForm = () => {
  // State for form inputs
  const [name, setName] = useState('');
  const [level, setLevel] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState(null);
  const [sucess, setSucess] = useState(null);
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API request to create a new course
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:7777/course', {
        name,
        level,
        description,
        image,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setSucess(response.data) // Handle success response
      resetForm();
      setTimeout(()=>{
        setSucess(null)
      },2000)
    } catch (error) {
      console.error('Error creating course:', error); // Handle error
      setError(error.response.data);
      setTimeout(()=>{
        setError(null)
      },2000)
    }
  };

  const resetForm = () => {
    setName('');
    setLevel('');
    setDescription('');
    setImage('')
  };

  return (
    <div className='addcourseform'>
      <h2>Add Course</h2>
      {error && <ErrorMessage message={error} />}

      <form onSubmit={handleSubmit}>
      
        {<input className="course-input" type="text" placeholder='Course Name' value={name} onChange={(e)=>setName(e.target.value)}/>}
        {<input className="course-input" type="text" placeholder='Level' value={level} onChange={(e)=>setLevel(e.target.value)}/>}
        {<input className="course-input" type="text" placeholder='Description' value={description} onChange={(e)=>setDescription(e.target.value)}/>}
        {<input className="course-input"type="text" placeholder='ImageURL' value={image} onChange={(e)=>setImage(e.target.value)}/>}
       
        <button className="course-button" type="submit">Add Course</button>
      </form>
      {sucess && <SucessMessage message={sucess} />}
    </div>
  );
};

export default AddCourseForm;
