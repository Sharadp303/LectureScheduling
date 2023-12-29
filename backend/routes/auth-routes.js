// const passport=require('passport')
const { register, login } = require("../controller/auth")
const passport=require('passport')

module.exports=function(app){
    app.post('/register',register)
    app.post('/login',passport.authenticate('local', { session: false }),login)
}