import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginForm from "./Components/Auth/Login/Login";
import RegistrationForm from "./Components/Auth/Register/Register";
import AdminPanel from './Components/AdminPanel/AdminPanel';
import LectureList from './Components/InstructorPanel/LectureList';
import InstructorList from './Components/Instructor/Instructor';
import AddCourseForm from './Components/AdminPanel/AddCourseForm';
import ScheduleLectureForm from './Components/AdminPanel/ScheduleLectureForm';

function App() {
  return (  
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<LoginForm/>}/>
      <Route path="/register" element={<RegistrationForm/>}/>

      <Route path="/instructors" element={<InstructorList />} />
      <Route path="/addcourse" element={<AddCourseForm />} />
      <Route path="/schedule" element={<ScheduleLectureForm />} />



      <Route path="/instructor/lectures" element={<LectureList />} />
      <Route path="/admin" element={<AdminPanel />} />


     </Routes>
    </BrowserRouter>
  );
}



export default App;
