const exp = require("express")
const router = exp.Router()
const authContrller = require("../Controller/authController")
const { authMiddleWare } = require("../MiddleWare/authMiddleWare")

router.post("/signup",authContrller.signUp)
router.post("/verifyOtp",authMiddleWare,authContrller.verifyOtp)


module.exports=router




