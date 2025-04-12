const exp = require("express")
const router = exp.Router()
const authContrller = require("../Controller/authController")
const { authMiddleWare } = require("../MiddleWare/authMiddleWare")

const multer = require('multer'); //
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/signup",authContrller.signUp)
router.post("/verifyOtp",authMiddleWare,authContrller.verifyOtp)
router.post("/completeProfile",authMiddleWare,upload.single("image"),authContrller.completeProfile)
router.post("/login",authContrller.login)
router.post("/todos",authMiddleWare,authContrller.getUserTodos)


module.exports=router




