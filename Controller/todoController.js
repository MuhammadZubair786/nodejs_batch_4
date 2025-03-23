const todosModel = require("../Models/todosModel");
const titleValidate = require("../Validator/todoValidate");

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

    req.body.userId = req._id;

    var todo = todosModel(req.body);
    todo.save();

    return res.status(200).json({
      message: "save data",
      data: todo,
    });
  } catch (e) {}
};

exports.getAllTodos = async (req, res) => {
  try {
    console.log(req._id);
    var todos = await todosModel.find({  userId: req._id});
    return res.status(200).json({
      message: "get All  data",
      data: todos,
    });
  } catch (e) {}
};


exports.deleteTodos = async(req,res)=>{
    try{
      console.log(req.params)
      return res.status(200).json({
        message: "get All  data",
        // data: todos,
      });
        // res.

    }
    catch(e){

    }
}
