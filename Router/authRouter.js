const exp = require("express")
const router = exp.Router()
const authContrller = require("../Controller/authController")
router.post("/signup",authContrller.signUp)

module.exports=router




