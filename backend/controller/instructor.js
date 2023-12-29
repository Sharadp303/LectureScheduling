const Instructor=require('../models/Instructor-model')
const Lecture=require('../models/Lecture-model')

async function availableInstructor(req,res){
    try{
        const {date}=req.body
        console.log(date)
        const validDate= new Date(date);
        const notavailable= await Lecture.find({date:validDate})
        
        console.log("NOT AVAILABLE",notavailable)
        
        const notavailableIds = notavailable.map(entry => entry.instructor);
        console.log("NotavailableIds",notavailableIds)
        
        const all=await Instructor.find();
        console.log("ALL",all)

        const available = all.filter(obj => {
            console.log("Checking:", obj._id, typeof obj._id);
          
            return !notavailableIds.some(notAvailableId => notAvailableId.equals(obj._id));
          });

        res.json(available)
    }
    catch(err){
        console.log(err)
        res.status(500).json({ message: 'Internal Sever Error' });
    }
}

async function getInstructor(req,res){
    try{
        const id=req.params.id;
        const result= await Instructor.findById(id)
        res.status(200).json(result)
    }
    catch(err){
        console.log(err)
        res.status(500).json({ message: 'Internal Sever Error' });
    }
}

async function getAllInstructor(req,res){
    try{
        const result= await Instructor.find()
        console.log("hello")
        res.status(200).json(result)
    }
    catch(err){
        console.log(err)
        res.status(500).json({ message: 'Internal Sever Error' });
    }
}


async function createInstructor(req,res){
    try{
        const {name,username,password}=req.body
        const result=await Instructor.create({name,username,password})
        console.log(result)
        res.status(201).json("Instructor created SucessFully")
    }
    catch(err){
        console.log(err)
        res.status(400).json({ message: 'Internal Sever Error' });
    }
}

async function updateInstructor(req,res){
    try{
        const id=req.params.id
        const {name,email}=req.body
        const instructor=await Instructor.findByIdAndUpdate(id,{name,email})
        res.status(200).json("SucessFully Updated")
        
    }
    catch(err){
        console.log(err)
        res.status(400).json({ message: 'Internal Sever Error' });
    }
}

async function deleteInstructor(req,res){
    try{
        const id=req.params.id
        const instructor=await Instructor.findByIdAndDelete(id)
        res.status(200).json("SucessFully Deleted")
    }
    catch(err){
        console.log(err)
        res.status(400).json({ message: 'Internal Sever Error' });
    }
}

module.exports={availableInstructor,getAllInstructor,getInstructor,createInstructor,updateInstructor,deleteInstructor}
