// components/InstructorList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Instructor.css'

const InstructorList = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    // Fetch the list of instructors when the component mounts
    const fetchInstructors = async () => {
      try {
        const response = await axios.get('http://localhost:7777/instructor');
        setInstructors(response.data);
      } catch (error) {
        console.error('Error fetching instructors:', error);
      }
    };

    fetchInstructors();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div className='instructor-container'>
  <h2>List of Instructors</h2>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Username</th>
      </tr>
    </thead>
    <tbody>
      {instructors.map((instructor) => (
        <tr key={instructor._id}>
          <td className='tdata'>{instructor.name}</td>
          <td className='tdata'>{instructor.username}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
};

export default InstructorList;
