const exp = require("express")
const router = exp.Router()
const authContrller = require("../Controller/authController")
router.get("/signup",authContrller.signUp)
router.get("/signup",authContrller.signUp)
module.exports=router




