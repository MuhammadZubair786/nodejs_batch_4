const userValidate = require("../Validator/authValidate")

exports.signUp = async (req, res) => {
    try {
        console.log(req.body)
        let validateData=await userValidate.validate(req.body)

        if(validateData.error){
            console.log(validateData.error.details[0].message)
             return res.status(400).json({
                message:validateData.error.details[0].message,
                status:false
            })

        }


       
        return res.status(200).json({
            message: "api hit",
        })

    }
    catch (e) {
        res.status(400).json({
            error: e
        })

    }
}
