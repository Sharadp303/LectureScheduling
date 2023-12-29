import React from "react"
import {Link} from "react-router-dom"
import './Adminpanel.css'
const AdminPanel=()=>{
    return(
        <>
        <div className="adminpanel">

        <h1>Admin Panel</h1>
        <Link className="link" to="/instructors"><h3>Instructors</h3></Link>
        <Link className="link" to="/addcourse"><h3>Add Course</h3></Link>
        <Link className="link" to="/schedule"><h3>Assign Instructor</h3></Link>

        </div>
        </>
        
    )
}
export default AdminPanel;