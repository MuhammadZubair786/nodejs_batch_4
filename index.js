const exp = require("express")
const app = exp()
const port = 5000
var bodyParser = require('body-parser')
var cors = require("cors")
const mainRouter = require("./Router/mainRouter")

bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json({}))

app.use(cors());
app.use(mainRouter)



app.listen(port,()=>{
    console.log(`server ready in port ${port}`)
})





