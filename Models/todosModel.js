
const mongoose = require("mongoose")

const todoModel = mongoose.Schema({
    title:{
        type:String,
        required:true,

    },
    status:{
        type:String,
        enum:["pending","inpocess","completed","delete"],
        default :"pending"
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "regsister",
        required: true,
    }
})

module.exports= mongoose.model("Todos",todoModel)