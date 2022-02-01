// const admin = require("../firebase-service")

const login = (req, res) => {
    res.json({ success: true, message: "login 🔑", })
}

const signup = async (req, res) => {
    // const {
    //     email,
    //     password,
    // } = req.body;
    // console.log(`${email}, ${password}`);
    // const user = await admin.auth().createUser({
    //     email,
    //     password,
    // });

    res.json({
        success: true,
        message: "signup 🧾",
        // user
    })
}

module.exports = { login, signup }