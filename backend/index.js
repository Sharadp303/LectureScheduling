const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize())

require('./routes/instructor-routes')(app)
require('./routes/auth-routes')(app)
require('./routes/course-routes')(app)
require('./routes/lecture-routes')(app)

// MongoDB Connection
mongoose.connect(process.env.DBURL, {
 }).then(()=>{
    console.log("Connected to db")
}).catch((err)=>{console.log(err)});


app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
