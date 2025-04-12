const exp = require("express")
const router = exp.Router()
const authRouter = require("./authRouter")
const todoRouter = require("./todoRouter")
const adminRouter = require("./adminRouter")

router.use("/auth",authRouter)
router.use("/todo",todoRouter)
router.use("/admin",adminRouter)






module.exports=router
