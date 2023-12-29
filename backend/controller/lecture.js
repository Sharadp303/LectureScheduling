const Lecture=require('../models/Lecture-model')
const Course=require('../models/Course-model')

async function assignLecture(req,res){
    try{
        const {date}=req.body;
        const validDate= new Date(date);

        const courseId=req.params.course;
        const instructorId=req.params.instructor

        const result=await Lecture.create({instructor:instructorId,course:courseId,date:validDate})
        console.log(result)

        const courseUpdate= await Course.findById(courseId)
        console.log(courseUpdate)
        
        courseUpdate.lectures.push(result._id)
        await courseUpdate.save();


        res.status(201).json("Lecture Assigned SuccessFully")
    }
    catch(err){
        console.log(err)
        res.status(500).json({ message: 'Internal Sever Error' });
    }

}

async function getLecturesOfInstructor(req,res){
    try{
        const instructorId=req.params.instructorId
        const allLectures= await Lecture.find()

        const result= allLectures.filter((ele)=>{
            return ele.instructor==instructorId;
        })

         let details=[];
         for (const ele of result) {
            let obj = {};

            const courseDetails = await Course.findById(ele.course);
            
            const originalDate = new Date(ele.date);

            const formattedDate = originalDate.toISOString().slice(2, 10);
            obj = {
                id:ele._id,
                Name: courseDetails.name,
                Level: courseDetails.level,
                Date: formattedDate,
                 };

            details.push(obj);
            }   
        console.log(details)
        // console.log(result)
        res.status(200).json(details)
    }
    catch(err){
        console.log(err)
        res.status(500).json({ message: 'Internal Sever Error' });
    }

}

module.exports={assignLecture,getLecturesOfInstructor}