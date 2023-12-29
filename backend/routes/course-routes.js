const { getAllCourse, getCourse, createCourse, updateCourse, deleteCourse } = require("../controller/course")
const passport= require('passport')
module.exports=function(app){
    app.get('/course',getAllCourse)
    app.get('/course/:id',getCourse)
    app.post('/course',passport.authenticate('jwt', { session: false }),createCourse)
    app.put('/course/update/:id',updateCourse)
    app.delete('/course/delete/:id',deleteCourse)
}