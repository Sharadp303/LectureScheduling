const { getInstructor, getAllInstructor, createInstructor, updateInstructor, deleteInstructor, availableInstructor } = require("../controller/instructor")

module.exports=function(app){
    app.get('/instructor',getAllInstructor)
    app.get('/instructor/:id',getInstructor)
    app.post('/instructor',createInstructor)
    app.post('/instructor/api/available',availableInstructor)
    app.put('/instructor/update/:id',updateInstructor)
    app.delete('/instructor/delete/:id',deleteInstructor)
}