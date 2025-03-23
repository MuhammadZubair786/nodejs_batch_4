const exp = require("express")
const router = exp.Router()
const authRouter = require("./authRouter")
const todoRouter = require("./todoRouter")

router.use("/auth",authRouter)
router.use("/todo",todoRouter)





module.exports=router
