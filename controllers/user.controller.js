const User = require("../models/user.model");
const SavedMessage = require("../models/savedMessage.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const login = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).catch((err) => {
        console.log(err);
    });
    if (user) {
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect) {
            const token = jwt.sign({ id: user._id, name: user.name }, secret);
            return res.json({
                status: true,
                message: "Login Successful",
                user: user,
                token: token,
            });
        }

        return res.json({
            token: null,
            user: null,
            status: false,
            message: "Wrong password, please try again",
        });
    }
    return res.json({
        token: null,
        user: null,
        status: false,
        message: "No account found with entered email",
    })
}


module.exports = {
    login,
}