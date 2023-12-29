// components/InstructorPanel/LectureList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const LectureList = () => {
  // State to store list of lectures
  const [lectures, setLectures] = useState([]);

  // Function to fetch list of lectures on component mount
  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const token =  localStorage.getItem('token');
        const decodedToken = jwtDecode(token)
        const cid=decodedToken.user._id
        // Make API request to get the list of lectures for the logged-in instructor
        const response = await axios.get(`http://localhost:7777/lecture/${cid}`);
        setLectures(response.data);
      } catch (error) {
        console.error('Error fetching lectures:', error); // Handle error
      }
    };

    fetchLectures();
  }, []);

  return (
    <div>
      <h2>Your Lectures</h2>
      <ul>
        {/* Render the list of lectures */}
        {lectures.map((lecture) => (
          <li key={lecture.id}>{lecture.Date} - {lecture.Name} - {lecture.Level}</li>
        ))}
      </ul>
    </div>
  );
};

export default LectureList;
