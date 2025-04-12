const exp = require("express")
const router = exp.Router()
const adminController = require("../Controller/adminController")
const { adminMiddleWare } = require("../MiddleWare/adminMiddleWare")

router.post("/login",adminController.Adminlogin)
router.post("/getalluser",adminMiddleWare,adminController.getAllUsers)


module.exports= router

