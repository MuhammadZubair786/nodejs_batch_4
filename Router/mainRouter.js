const exp = require("express")
const router = exp.Router()
const authRouter = require("./authRouter")
router.use("/auth",authRouter)





module.exports=router
