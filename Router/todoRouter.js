const exp = require("express")
const router = exp.Router()
const todoController = require("../Controller/todoController")
const { authMiddleWare } = require("../MiddleWare/authMiddleWare")

router.post("/create",authMiddleWare,todoController.createTodo)
router.get("/get",authMiddleWare,todoController.getAllTodos)
router.delete("/delete/:id",authMiddleWare,todoController.deleteTodos)
router.put("/update/:id",authMiddleWare,todoController.updateTodo)




module.exports=router