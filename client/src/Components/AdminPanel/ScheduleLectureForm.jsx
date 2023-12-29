// components/AdminPanel/LectureScheduleForm.js
import React, { useState, useEffect ,useCallback} from 'react';
import axios from 'axios';
import SucessMessage from '../Common/SucessMessage';
import './ScheduleLecture.css'
import ErrorMessage from '../Common/ErrorMessage';
const LectureScheduleForm = () => {
  const [date, setDate] = useState('');
  const [availableInstructors, setAvailableInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [sucess, setSucess] = useState(null);
  const [error, setError] = useState(null);
  

  const fetchAvailableInstructors = useCallback(async (selectedDate) => {
    try {
      setLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_ReactUrl}/instructor/api/available`, {
        date: selectedDate || date,
      });
      setAvailableInstructors(response.data);
    } catch (error) {
      console.error('Error fetching available instructors:', error);
    } finally {
      setLoading(false);
    }
  },[date]);

  const fetchCourses = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_ReactUrl}/course`);
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  },[]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch available instructors and courses when the component mounts
      await fetchAvailableInstructors();
      await fetchCourses();
    };

    // Call fetchData when the component mounts
    fetchData();
  }, [fetchAvailableInstructors,fetchCourses]);

  const handleDateChange = async (selectedDate) => {
    setDate(selectedDate);

    try {
      // Fetch available instructors when the date changes
      await fetchAvailableInstructors(selectedDate);
    } catch (error) {
      console.error('Error fetching available instructors:', error);
    }
  };

  const handleInstructorChange = (instructorId) => {
    setSelectedInstructor(instructorId);
  };

  const handleCourseChange = (courseId) => {
    setSelectedCourse(courseId);
  };

  const handleScheduleLecture = async () => {
    try {
      setLoading(true);
      // Make API request to schedule a new lecture
      const response = await axios.post(`${process.env.REACT_APP_ReactUrl}/lecture/${selectedCourse}/${selectedInstructor}`, {
        date,
      });

      setSucess(response.data)
      setTimeout(()=>{
        setSucess(null)
      },2000)
      // Optionally, you can fetch and update the list of available instructors, courses, or perform any other actions after scheduling.

      console.log('Lecture Scheduled Successfully');
      // Reset form values
      resetForm();
    } catch (error) {
      setError("All the fields are required");
      setTimeout(()=>{
        setError(null)
      },2000)
      console.error('Error scheduling lecture:', error); // Handle error
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setDate('');
    setSelectedInstructor('');
    setSelectedCourse('');
  };

  return (
    <div className='scheduleform'>
      <h2>Schedule Lecture</h2>
      {error && <ErrorMessage message={error} />}
      <form>
        {/* Input for selecting a date */}
        <label>
          Select Date:
          <input
          className='schedule-input'
            type="date"
            value={date}
            onChange={(e) => handleDateChange(e.target.value)}
            required
          />
        </label>

        {/* Dropdown for selecting a course */}
        <label>
          Select Course:
          <select
           className='schedule-input'
            value={selectedCourse}
            onChange={(e) => handleCourseChange(e.target.value)}
            required
          >
            <option value="">Select a Course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name}
              </option>
            ))}
          </select>
        </label>

        {/* Dropdown for selecting an instructor */}
        <label>
          Select Instructor:
          <select
           className='schedule-input'
            value={selectedInstructor}
            onChange={(e) => handleInstructorChange(e.target.value)}
            required
          >
            <option value="">Select an Instructor</option>
            {availableInstructors.map((instructor) => (
              <option key={instructor._id} value={instructor._id}>
                {instructor.name}
              </option>
            ))}
          </select>
        </label>

        {/* Add more inputs as needed for other lecture details */}
        {/* Example: Input for lecture time, etc. */}

        {/* Button to schedule the lecture */}
        <button  className='schedule-button' type="button" onClick={handleScheduleLecture} disabled={loading}>
          {loading ? 'Scheduling...' : 'Schedule Lecture'}
        </button>
      </form>
      {sucess && <SucessMessage message={sucess} />}
    </div>
  );
};

export default LectureScheduleForm;
