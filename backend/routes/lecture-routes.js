const { assignLecture, getLecturesOfInstructor } = require("../controller/lecture")

module.exports=function(app){
    app.post('/lecture/:course/:instructor',assignLecture)
    app.get('/lecture/:instructorId',getLecturesOfInstructor)

}