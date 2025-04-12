
const { populate } = require("../Models/authModel");
const todosModel = require("../Models/todosModel");
const titleValidate = require("../Validator/todoValidate");
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId;
exports.createTodo = async (req, res) => {
  try {
    const todoCheck = await titleValidate.validate(req.body);
    if (todoCheck.error) {
      console.log(todoCheck.error.details[0].message);
      return res.status(400).json({
        message: todoCheck.error.details[0].message,
        status: false,
      });
    }

    console.log(req._id)
    console.log("******")

    req.body.userId = req._id;

    var todo = todosModel(req.body);
    todo.save();

    return res.status(200).json({
      message: "save data",
      data: todo,
    });
  } catch (e) { }
};

exports.getAllTodos = async (req, res) => {
  // try {
  console.log(req._id);
  var todos = await todosModel.find({ userId: req._id }).populate({
    path: "userId",
    select: "email profileId"
  }).populate({
    path: "userId",
    populate: {
      path: "profileId",
      select: "image"
    }
    // populate:"profileId"
  })

  // .populate({
  //   path: "userId",
  //   populate:{
  //     path:"profileId",
  //     select:"age image"
  //   },
  //   select:"email password"
  // });
  return res.status(200).json({
    message: "get All  data",
    data: todos,
  });
  // } catch (e) { }
};


exports.deleteTodos = async (req, res) => {
  try {
    console.log(req.params.id)
    var deletTodo = await todosModel.findOneAndDelete({ _id: req.params.id, userId: req._id })
    return res.status(200).json({
      message: "get All  data",
      data: deletTodo

    });
    // res.

  }
  catch (e) {

  }
}

exports.updateTodo = async (req, res) => {
  try {
    var deletTodo = await todosModel.findOneAndUpdate({ _id: req.params.id, userId: req._id },
      req.body
    )
    return res.status(200).json({
      message: "get All  data",
      data: deletTodo

    });

  }
  catch (E) {

  }
}

exports.searchApi=async(req,res)=>{
  try{
    const {title}= req.body
    

    const piplines = [
      {
        '$match': {
          'userId': new ObjectId(req._id), 
          'title': {
            '$eq':title
          }
        }
      }
    ]

    const todos = await todosModel.aggregate(piplines)
    res.status(200).json({
      message:"get",
      data : todos
    })



  }
  catch(e){

  }
}
