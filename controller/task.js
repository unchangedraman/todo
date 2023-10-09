import Errorhandler from "../middleware/error.js";
import { Task } from "../models/task.js";
export const newtask = async(req,res,next)=> {
    
    const {title,description} = req.body;
    /*const task = new Task({title});
    await task.save();*/ // this thing and the below line is same

    await Task.create({
        title,
        description,
        user: req.user,// req.user me isliye hamare pass user ki information hoggi kyoki isauth pahle hi call ho chuka hai


    });
    res.status(201).json({
        success: true,
        message: "task added successfully",
    });
};
export const getallTask = async(req,res,next) => {
    const userId = req.user.id;
    const usertask = await Task.find({user: userId}).populate('user','name');// pupulate wala function money name aur add krgega
    res.json({
        success: true,
        task: usertask,
    });
    
};
export const updateTask = async(req,res,next) => {
 //   const id = req.params.id;
      const {id} = req.params;
      const task = await Task.findById(id);
      console.log(task);
      if (!task) 
     res.status(404).json({
        success: false,
        message: 'Task not found',
    });
      task.iscompleted = !task.iscompleted;
      await task.save(); // yaha hoga promise return so make sure to use await

    res.json({
        success: true,
        message: "task updated",
    });
    
};

export const deleteTask = async (req, res, next) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return next (new Errorhandler("yes the error is fixed",404));
    }
    await task.deleteOne();
    res.json({
      success: true,
      message: "task deleted",
    });
  };
  