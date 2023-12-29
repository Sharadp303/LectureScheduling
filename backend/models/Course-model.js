const mongoose=require('mongoose')

const courseSchema= new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    level: { 
        type: String, 
        required: true 
    },
    description: {
         type: String, 
        required: true },
    image: { 
        type: String 
    }, 
    lectures:{ 
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Lecture"
    }
        
},{timestamps:true})
module.exports=mongoose.model("Course",courseSchema)