exports.signUp = (req, res) => {
    try {
        console.log(e)
        res.status(200).json({
            message: "api hit",
        })

    }
    catch (e) {
        res.status(400).json({
            error: e
        })

    }
}
