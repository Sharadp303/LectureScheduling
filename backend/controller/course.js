const Course=require('../models/Course-model')
const Lecture=require('../models/Lecture-model')

async function getCourse(req,res){
    try{
        const id=req.params.id;
        const result= await Course.findById(id)
        res.status(200).json(result)
    }
    catch{
        res.status(500).json({ message: 'Internal Sever Error' });
    }
}



async function getAllCourse(req,res){
    try{
        const result= await Course.find()
        console.log("hello course")
        res.status(200).json(result)
    }
    catch{
        res.status(500).json({ message: 'Internal Sever Error' });
    }
}


async function createCourse(req,res){
    console.log(req.user)
    try{
        const {name,level,description,image}=req.body       
        
        const existingCourse = await Course.findOne({name,level});
        console.log(existingCourse)

        if(existingCourse){
            return res.status(400).json('Course already Exists' );          
        }
        
        const result=await Course.create({name,level,description,image})
        
        console.log(result)
        res.status(201).json("Course created SucessFully")
    }
    catch(err){
        console.log(err)
        res.status(500).json('Internal Sever Error' );
    }
}

async function updateCourse(req,res){
    try{
        const id=req.params.id
        const {name,level,description,image}=req.body
        const course=await Course.findByIdAndUpdate(id,{name,level,description,image,lectures})
        res.status(200).json("SucessFully Updated")
        
    }
    catch{
        res.status(400).json({ message: 'Internal Sever Error' });
    }
}

async function deleteCourse(req,res){
    try{
        const id=req.params.id
        const course=await Course.findByIdAndDelete(id)
        res.status(200).json("SucessFully Deleted")
    }
    catch{
        res.status(400).json({ message: 'Internal Sever Error' });
    }
}

module.exports={getCourse,getAllCourse,createCourse,updateCourse,deleteCourse}
